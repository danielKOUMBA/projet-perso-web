from flask import request,jsonify,Blueprint
from app.models import Commande,Cout
from app.extension import db
from flask_jwt_extended import jwt_required

tresorerie_bp=Blueprint('tresorerie_bp',__name__)

@tresorerie_bp.route('/tresorerie',methods=['POST'])
@jwt_required()
def tresorerie():
    op_entrante=Commande.query.all()
    op_sortante=Cout.query.all()
    somme_entrante=[]
    somme_sortante=[]
    
    for op in op_entrante:
        somme_entrante.append(op.prix_avancer)
    for ops in op_sortante:
        somme_sortante.append(ops.prix)

    tresorerie=sum(x for x in somme_entrante)-sum(y for y in somme_sortante)
    
    return jsonify([f'{tresorerie}'])