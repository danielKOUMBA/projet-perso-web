from flask import jsonify, Blueprint
from app.models.commande_table import Commande
from app.extension import db
from flask_jwt_extended import jwt_required,get_jwt_identity
from datetime import datetime

allCommande_bp = Blueprint('allCommande', __name__)

@allCommande_bp.route('/allCommande', methods=['POST'])
@jwt_required()
def AllCommande():
    admin = get_jwt_identity()

    if admin not in ['admin suppreme', 'admin secondaire']:
        return jsonify({'erreur': "vous n'etes pas eligible"}), 403

    commandes = Commande.query.all()

    if not commandes:
        return jsonify({'erreur': 'Aucune commande enregistrée'}), 404

    result = []
    for c in commandes:
        result.append({
            'id': c.id,
            'nom': c.nom,
            'numero': str(c.numero),  
            'produits': c.produits,
            'status': c.status,
            'date': c.date.isoformat() if c.date else None,
            'type': c.type,
            'prix_avancer': float(c.prix_avancer),
            'prix_total': float(c.prix_total)
        })
    result=sorted(
         result,
         key=lambda x:datetime.strptime(x['date'],'%Y-%m-%dT%H:%M:%S'),
         reverse=True
     )
    return jsonify(result), 200