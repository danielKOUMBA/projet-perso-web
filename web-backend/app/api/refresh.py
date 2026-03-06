from flask_jwt_extended import get_jwt_identity,create_access_token,jwt_required
from flask import Blueprint , jsonify

refresh_bp=Blueprint('refresh_bp',__name__)

@refresh_bp.route('/refresh',methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user=get_jwt_identity()
    new_token=create_access_token(identity=user)

    return jsonify({
        'new_token':new_token,
        'status':'token recu avec succes'
    })