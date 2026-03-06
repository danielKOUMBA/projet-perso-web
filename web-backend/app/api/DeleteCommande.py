from flask import jsonify, Blueprint,request
from app.models.commande_table import Commande
from app.extension import db
from flask_jwt_extended import jwt_required,get_jwt_identity

deleteCommande_bp=Blueprint('deleteCommande_bp',__name__)

@deleteCommande_bp.route('/deleteCommande',methods=['POST'])
@jwt_required()
def DeleteCommande():
    admin=get_jwt_identity()
    data=request.get_json()
    commande=Commande.query.filter_by(id=data.get('id')).first()
    if admin=='admin suppreme' or admin=='admin secondaire':
        if not commande:
            return jsonify({'erreur':'Commandes inexistantes'})
        
        db.session.delete(commande)
        db.session.commit()
        
        commandes=Commande.query.all()
        result=[
            {
                'id':c.id,
                'nom':c.nom,
                'numero':c.numero,
                'produits':c.produits,
                'status':c.status,
                'date':str(c.date),
                'type':c.type ,
                'prix avancer':c.prix_avancer,
                'prix total':c.prix_total   
            }
            for c in commandes
        ]

        return jsonify(result),200
    
    return jsonify({
        'erreur':"Vous n'etes pas eligible"
    })
