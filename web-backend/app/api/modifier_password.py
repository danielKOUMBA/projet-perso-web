from flask import Blueprint,jsonify,request
from app.extension import db
from app.models import Admin 
from flask_jwt_extended import create_access_token,create_refresh_token
from werkzeug.security import generate_password_hash,check_password_hash

modifier_password_bp=Blueprint('modifier_password_bp',__name__)

@modifier_password_bp.route('/update_password',methods=['POST'])
def modifier_password():
    data=request.get_json()
    user=Admin.query.filter_by(email=data.get('email')).first()
    if user and check_password_hash(user.password,data.get('OldPassword')):
        user.password=generate_password_hash(data.get('NewPassword'))
        token=create_access_token(identity=user.role)
        refresh_token=create_refresh_token(identity=user.role)
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'status':"Mots de passe changer avec succes",
            'token':token,
            'refresh_token':refresh_token
        })
    return jsonify(['Email ou Mots de passe actuel incorrect'] )
    
    