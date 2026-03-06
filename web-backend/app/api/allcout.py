from flask import jsonify,Blueprint
from app.models.Cout import Cout
from app.extension import db
from flask_jwt_extended import jwt_required,get_jwt_identity
from datetime import datetime

allCout_bp=Blueprint('allCout_bp',__name__)

@allCout_bp.route('/allCout',methods=['POST'])
@jwt_required()
def allCout():
    admin=get_jwt_identity()
    
    if admin not in ['admin suppreme']:
                return jsonify({
       'erreur':"Vous n'etes pas eligible"
         })
    cout=Cout.query.all()
    if not cout:
        return jsonify({'erreur':'Pas de cout enregistrer'})
        
    result=[
            {
                'id':c.id,
                'nom':c.nom,
                'prix':c.prix,
                'date':str(c.date)
            }
            for c in cout
        ]
    result=sorted(
         result,
         key=lambda x:datetime.strptime(x['date'],'%Y-%m-%d %H:%M:%S'),
         reverse=True
     )

    return jsonify(result)
    

    

