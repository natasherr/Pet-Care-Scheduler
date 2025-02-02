from flask import Flask # type: ignore
from flask_migrate import Migrate # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_jwt_extended import JWTManager # type: ignore
from flask_cors import CORS # type: ignore
from flask_mail import Mail, Message # type: ignore
from datetime import timedelta
from models import db

app = Flask(__name__)

CORS(app)
# Migration initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://pet_care_scheduler_db_user:A6Wh79y0DMjBdqXXCTJLBg7PQQgEsKWt@dpg-cuft05qn91rc73cjh0u0-a.oregon-postgres.render.com/pet_care_scheduler_db'
migrate = Migrate(app,db)
db.init_app(app)

# Sending an email
# Flask mail configuration
app.config["MAIL_SERVER"]= 'smtp.gmail.com'
app.config["MAIL_PORT"]=587
app.config["MAIL_USE_TLS"]=True
app.config["MAIL_USE_SSL"]=False
app.config["MAIL_USERNAME"]="ashley.testingmoringa@gmail.com"
app.config["MAIL_PASSWORD"]= 'grst jjck zwug sbiz'
app.config["MAIL_DEFAULT_SENDER"]="ashley.testingmoringa@gmail.com"


mail = Mail(app)

# JWT
# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secretttttttt"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=20)

jwt = JWTManager(app)
# Initializing the jwt
jwt.init_app(app)



# Import all functions in the views folder
from views import *

app.register_blueprint(user_bp)
app.register_blueprint(supply_bp)
app.register_blueprint(routine_bp)
app.register_blueprint(pet_bp)
app.register_blueprint(appointment_bp)
app.register_blueprint(auth_bp)


# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlockList.id).filter_by(jti=jti).scalar()

    return token is not None
