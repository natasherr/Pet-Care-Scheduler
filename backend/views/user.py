from models import db, User, Pet
from flask import jsonify, request, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
from app import app, mail
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

# FETCH USERS
@user_bp.route('/users')
def fetch_users():
    users = User.query.all()
    

    user_list = []
    for user in users:
        user_list.append({
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "is_verified": user.is_verified,
            "pets":[{
                "pet_id": pet.pet_id,
                "name": pet.name,
                "breed": pet.breed,
                "age": pet.age,
            } for pet in user.pets]
            })
    
    return jsonify(user_list)

# FETCH USER BY ID
@user_bp.route('/users/<int:user_id>')
@jwt_required()
def fetch_user_by_id(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    else:
        return jsonify({
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "is_verified": user.is_verified,
            "pets":[{
                "pet_id": pet.pet_id,
                "name": pet.name,
                "breed": pet.breed,
                "age": pet.age,
                } for pet in user.pets]
                }), 200
    

# ADD USER
@user_bp.route('/users/add', methods=['POST'])
def add_user():
    data = request.get_json()

    name = data['name']
    email = data['email']
    password = generate_password_hash(data['password'])

    check_username = User.query.filter_by(name=name).first()
    check_email = User.query.filter_by(email=email).first()

    if check_username or check_email:
        return jsonify({"error": "Username or Email already exists"}), 406
    
    else:
        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        try:
            msg = Message(
                subject='Account Verification',
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[email],
                body = "Thankyou for registering to our App(Pet Care Scheduler), where quality meets excellence."
            )
            mail.send(msg)
            return jsonify({"message": "User created successfully"}), 201
    
        except Exception as e:
        
            return jsonify({"error": f"Failed to send {e}"}), 406

# UPDATE USER
@user_bp.route('/users/update/<int:user_id>', methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        data = request.get_json()

        name = data.get('name', user.name)
        email = data.get('email', user.email)
        password = data.get('password', user.password)
        is_verified = data.get('is_verified', user.is_verified)

        check_name = User.query.filter_by(name=name and id!= user.user_id).first()
        check_email = User.query.filter_by(email=email and id!= user.user_id).first()

        if check_name or check_email:
            return jsonify({"error": "Username or Email already exists"}), 406
        
        else:
            user.name = name
            user.email = email
            user.password = password
            user.is_verified = is_verified

            db.session.commit()
            return jsonify({"success": "User updated successfully"}), 200
        
    else:
        return jsonify({"error": "User not found"}), 404
    

# DELETE USER
@user_bp.route('/users/delete/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    else:
        db.session.delete()
        db.session.commit()
        return jsonify({"success": "Deleted successfully."})
    
    