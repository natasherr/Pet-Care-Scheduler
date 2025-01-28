from models import db, User, Pet, Supplies
from flask import jsonify, request, Blueprint # type: ignore
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore

supply_bp = Blueprint('supplies', __name__)

# FETCH ALL SUPPLIES
@supply_bp.route("/supplies", methods=["GET"])
@jwt_required()
def get_supplies():
    current_user_id = get_jwt_identity()
    supplies = Supplies.query.join(Pet).filter(Pet.user_id == current_user_id).all()

    return jsonify([supply.to_dict() for supply in supplies]), 200

# FETCH SUPPLY BY ID
@supply_bp.route("/supplies/<int:supply_id>", methods=["GET"])
@jwt_required()
def get_supply_by_id(supply_id):
    current_user_id = get_jwt_identity()
    supply = Supplies.query.join(Pet).filter(Supplies.supply_id == supply_id, Pet.user_id == current_user_id).first()

    if not supply:
        return jsonify({"message": "Supply not found"}), 404
    
    else:
        return jsonify(supply.to_dict()), 200
    
# ADD A SUPPLY
@supply_bp.route("/supplies", methods=["POST"])
@jwt_required()
def add_supply():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    supply = Supplies(
        pet=data["pet"],
        item=data["item"],
        quantity=data["quantity"],
    )
    db.session.add(supply)
    db.session.commit()
    return jsonify({"message": "Supply added successfully"}), 201


# UPDATE A SUPPLY
@supply_bp.route("/supplies/<int:supply_id>", methods=["PUT"])
@jwt_required()
def update_supply(supply_id):
    current_user_id = get_jwt_identity()
    supply = Supplies.query.join(Pet).filter(Supplies.supply_id == supply_id, Pet.user_id == current_user_id).first()
    if not supply:
        return jsonify({"message": "Supply not found"}), 404

    data = request.get_json()
    supply.item = data.get("item", supply.item)
    supply.quantity = data.get("quantity", supply.quantity)
    db.session.commit()
    return jsonify({"message": "Supply updated successfully", "supply": supply.to_dict()}), 200


# DELETE A SUPPLY
@supply_bp.route("/supplies/<int:supply_id>", methods=["DELETE"])
@jwt_required()
def delete_supply(supply_id):
    current_user_id = get_jwt_identity()
    supply = Supplies.query.join(Pet).filter(Supplies.supply_id == supply_id, Pet.user_id == current_user_id).first()
    if not supply:
        return jsonify({"message": "Supply not found"}), 404

    db.session.delete(supply)
    db.session.commit()
    return jsonify({"message": "Supply deleted successfully"}), 200