from models import db, Pet
from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

pet_bp = Blueprint('pet', __name__) 

# FETCH PETS
@pet_bp.route('/pets')
def fetch_pets():
    pets = Pet.query.filter_by(user_id=get_jwt_identity()).all()

    pet_list = [{
        "pet_id": pet.pet_id,
        "name": pet.name,
        "age": pet.age,
        "breed": pet.breed
    } for pet in pets]

    return jsonify(pet_list), 200

# FETCH PET BY ID
@pet_bp.route('/pets/<int:pet_id>')
def fetch_pet(pet_id):
    pet = Pet.query.filter_by(pet_id=pet_id).first()
    if not pet:
        return jsonify({"message": "Pet not found"}), 404
    else:
        return jsonify({
            "pet_id": pet.pet_id,
            "name": pet.name,
            "age": pet.age,
            "breed": pet.breed
            }), 200
    

# ADD PET
@pet_bp.route('/pets/add', methods=['POST'])
@jwt_required
def add_pet():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_pet= Pet(
        name = data["name"],
        breed = data["breed"],
        age = data["age"],
        user_id = current_user_id
    )
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({"message": "Pet added successfully"}), 200

# UPDATE PET
@pet_bp.route('/pets/update/<int:pet_id>', methods=['PATCH'])
@jwt_required()
def update_pet(pet_id):
    current_user_id = get_jwt_identity()
    pet = Pet.query.filter_by(pet_id=pet_id, user_id=current_user_id).first()

    if not pet:
        return jsonify({"error": "Pet not found"}), 404
    
    data = request.get_json()
    pet.name = data.get("name", pet.name)
    pet.breed = data.get("breed", pet.breed)
    pet.age = data.get("age", pet.age)
    db.session.commit()
    return jsonify({"message": "Pet updated successfully"}), 200


# DELETE PET
@pet_bp.route('/pets/delete/<int:pet_id>', methods=['DELETE'])
@jwt_required()
def delete_pet(pet_id):
    current_user_id = get_jwt_identity()
    pet = Pet.query.filter_by(pet_id=pet_id, user_id=current_user_id).first()

    if not pet:
        return jsonify({"error": "Pet not found"}), 404
    
    db.session.delete(pet)
    db.session.commit()
    return jsonify({"message": "Pet deleted successfully"}), 200
