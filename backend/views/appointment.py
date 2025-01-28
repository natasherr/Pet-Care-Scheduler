from models import db, User, Pet, Appointment
from flask import jsonify, request, Blueprint # type: ignore
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore
from datetime import datetime


appointment_bp = Blueprint('appointment', __name__)

# FETCH ALL APPOINTMENTS
@appointment_bp.route('/appointments')
@jwt_required()
def get_appointments():
    current_user_id = get_jwt_identity()
    appointments = Appointment.query.join(Pet).filter(Pet.user_id == current_user_id).all()
    return jsonify([appointment.to_dict() for appointment in appointments])

# FETCH APPOINTMENT BY ID
@appointment_bp.route('/appointments/<int:appointment_id>')
@jwt_required()
def get_appointment_by_id(appointment_id):
    current_user_id = get_jwt_identity()
    appointment = Appointment.query.join(Pet).filter(Appointment.appointment_id == appointment_id, Pet.user_id == current_user_id).first()

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    return jsonify(appointment.to_dict()), 200


# ADD AN APPOINTMENT
@appointment_bp.route('/appointments', methods=['POST'])
@jwt_required()
def add_appointment():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    appointment = Appointment(
        pet=data['pet'],
        appointment_date = data['appointment_date'],
        type = data['type'],
        status = "Scheduled"
        )
    
    db.session.add(appointment)
    db.session.commit()

    return jsonify({"success": "Appointment added successfully!!"})

# UPDATE APPOINTMENT
@appointment_bp.route('/appointments/<int:appointment_id>', methods=['PATCH'])
@jwt_required()
def update_appointment(appointment_id):
    current_user_id = get_jwt_identity()
    appointment = Appointment.query.join(Pet).filter(Appointment.appointment_id == appointment_id, Pet.user_id == current_user_id).first()
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    
    data = request.get_json()

    appointment.appointment_date = data.get("appointment_date", appointment.appointment_date)
    appointment.type = data.get("type", appointment.type)
    appointment.status = data.get("status", appointment.status)

    db.session.commit()
    return jsonify({"message": "Appointment updated successfully"}), 200

# DELETE AN APPOINTMENT
@appointment_bp.route('/appointments/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(appointment_id):
    current_user_id = get_jwt_identity()

    appointment = Appointment.query.join(Pet).filter(Appointment.appointment_id == appointment_id, Pet.user_id == current_user_id).first()
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"success": "Appointment deleted successfully"}), 200
