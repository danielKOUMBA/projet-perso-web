from flask import request,jsonify,Blueprint
from app.models import Commande
from app.extension import db
from flask_jwt_extended import jwt_required
from collections import Counter

dash_bp=Blueprint('dash_bp',__name__)

@dash_bp.route('/dash',methods=['POST'])
@jwt_required()
def dash():
    produit=Commande.query.all()
    type=[p.type for p in produit]
    counter=Counter(type)

    labels=list(counter.keys())
    values=list(counter.values())
    
    return jsonify({ 
        'labels':labels,
        'values':values
    })
     

