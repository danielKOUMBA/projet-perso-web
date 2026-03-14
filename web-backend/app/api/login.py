
from flask import Blueprint, request, jsonify, make_response
from app.models import Admin
from flask_jwt_extended import create_refresh_token, create_access_token
from werkzeug.security import check_password_hash

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({'erreur': 'Données manquantes'}), 400

    email = data.get('email')
    password = data.get('password')

    user = Admin.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.role)
        refresh_token = create_refresh_token(identity=user.role)

        response = make_response(jsonify({
        "token": access_token
        }))

        response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        secure=False, 
        samesite="None",
        path="/",
        max_age=7 * 24 * 60 * 60
        )

        return response

   
    return jsonify({'erreur': 'Email ou mot de passe incorrect'}), 401


        