from flask import jsonify, Blueprint,request
from app.models.commande_table import Commande
from app.extension import db
from flask_jwt_extended import jwt_required


update_bp=Blueprint('update_bp',__name__) 

@update_bp.route('/updateCommande',methods=['PUT'])
@jwt_required()
def update():
    data=request.get_json()
    commande=Commande.query.filter_by(id=data.get('id')).first()
    status=''
    if float(data.get('prix_avancer'))==float(data.get('prix_total')):
        status='payer'
    else:
        status='partiellement payer'
    if not commande:
        return jsonify({'erreur':'Commande non trouvée'}),404
    commande.nom=data.get('nom')
    commande.numero=data.get('numero')
    commande.produits=data.get('produits')
    commande.type=data.get('type')
    commande.prix_avancer=data.get('prix_avancer')
    commande.prix_total=data.get('prix_total')
    commande.status=status
    db.session.add(commande)
    db.session.commit()
    return jsonify({'message':'Commande mise à jour avec succès'})