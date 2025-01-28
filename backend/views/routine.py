from models import db, User, Pet, Routine
from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

routine_bp = Blueprint('routine', __name__)

# FETCH ROUTINES
@routine_bp.route('/routines')
@jwt_required()
def fetch_routines():
    current_user_id = get_jwt_identity()
    routines =  Routine.query.join(Pet).filter(Pet.user_id == current_user_id).all()
    return jsonify([routine.to_dict() for routine in routines]), 200

# FETCH ROUTINE BY ID
@routine_bp.route("/routines/<int:routine_id>", methods=["GET"])
@jwt_required()
def get_routine_by_id(routine_id):
    current_user_id = get_jwt_identity()

    routine = Routine.query.join(Pet).filter(Routine.routine_id == routine_id, Pet.user_id == current_user_id).first()

    if not routine:
        return jsonify({"message": "Routine not found"}), 404
    
    return jsonify(routine.to_dict()), 200

# ADD A ROUTINE
@routine_bp.route('/routines', methods=['POST'])
@jwt_required()
def add_routine():
    current_user_id = get_jwt_identity()

    data = request.get_json()
    routine = Routine(
        pet=data["pet"],
        routine_date=data["routine_date"],
        type=data["type"],
    )
    db.session.add(routine)
    db.session.commit()
    return jsonify({"message": "Routine added successfully"}), 201

# UPDATE A ROUTINE
@routine_bp.route("/routines/<int:routine_id>", methods=["PATCH"])
@jwt_required()
def update_routine(routine_id):
    current_user_id = get_jwt_identity()
    routine = Routine.query.join(Pet).filter(Routine.routine_id == routine_id, Pet.user_id == current_user_id).first()
    if not routine:
        return jsonify({"message": "Routine not found"}), 404

    data = request.get_json()
    routine.routine_date = data.get("routine_date", routine.routine_date)
    routine.type = data.get("type", routine.type)

    db.session.commit()
    return jsonify({"message": "Routine updated successfully"}), 200

# DELETE A ROUTINE
@routine_bp.route("/routines/<int:routine_id>", methods=["DELETE"])
@jwt_required()
def delete_routine(routine_id):
    current_user_id = get_jwt_identity()
    routine = Routine.query.join(Pet).filter(Routine.routine_id == routine_id, Pet.user_id == current_user_id).first()
    if not routine:
        return jsonify({"message": "Routine not found"}), 404

    db.session.delete(routine)
    db.session.commit()
    return jsonify({"success": "Routine deleted successfully"}), 200

