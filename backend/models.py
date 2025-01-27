from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)


class Pet(db.Model):
    pet_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    breed = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    
    user = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

class Appointment(db.Model):
    appointment_id = db.Column(db.Integer, primary_key=True)

    pet = db.Column(db.Integer, db.ForeignKey('pet.pet_id'), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.String(128), nullable=False)
    status = db.Column(db.String(128), nullable=False)

class Routine(db.Model):
    routine_id = db.Column(db.Integer, primary_key=True)
    pet = db.Column(db.Integer, db.ForeignKey('pet.pet_id'), nullable=False)
    routine_date = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.String(128), nullable=False)

class Supplies(db.Model):
    supply_id = db.Column(db.Integer, primary_key=True)
    pet = db.Column(db.Integer, db.ForeignKey('pet.pet_id'), nullable=False)
    item = db.Column(db.String(128), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)




    