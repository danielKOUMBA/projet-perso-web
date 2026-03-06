from flask import jsonify, Blueprint,request
from app.models.Cout import Cout
from app.extension import db
from flask_jwt_extended import jwt_required,get_jwt_identity


deleteCout_bp=Blueprint('deleteCout_bp',__name__)

@deleteCout_bp.route('/deleteCout',methods=['POST'])
@jwt_required()
def deleteCount():
    admin=get_jwt_identity()
    if admin=='admin suppreme':
        data=request.get_json()

        cout=Cout.query.filter_by(id=data.get('id')).first()

        if not cout:
            return jsonify({'erreur':'cout inexistant'})
        
        db.session.delete(cout)
        db.session.commit()
        
        couts=Cout.query.all()

        result=[
            {
                'id':c.id,
                'nom':c.nom,
                'prix':c.prix,
                'date':str(c.date)
            }
            for c in couts
        ]

        return jsonify(result),200
    return jsonify({
        'erreur':"Vous n'etes pas eligible"
    })
