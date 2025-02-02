from flask import jsonify, request, Blueprint # type: ignore
from models import db, User, TokenBlockList
from werkzeug.security import check_password_hash # type: ignore
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt # type: ignore
from datetime import datetime, timedelta, timezone

auth_bp = Blueprint("auth_bp", __name__)

# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password ) :
        access_token = create_access_token(identity=user.user_id)
        return jsonify({"access_token": access_token}), 200

    else:
        return jsonify({"error": "Either email/password is incorrect"}), 404


# current user
@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id  = get_jwt_identity()

    user =  User.query.get(current_user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        'id': user.user_id,
        'name': user.name,
        'email': user.email,
        'is_admin': user.is_admin,
        'is_verified': user.is_verified
    }

    return jsonify(user_data)



# Logout
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlockList(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"success":"Logged out successfully"})
