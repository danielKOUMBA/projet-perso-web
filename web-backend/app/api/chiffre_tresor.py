from flask_jwt_extended import get_jwt_identity,jwt_required
from app.models.Cout import Cout
from app.models.commande_table import Commande
from app.extension import db
from flask import Blueprint,request,jsonify
from datetime import datetime,time

tresor_trie_bp=Blueprint('tresor_trie_bp',__name__)

@tresor_trie_bp.route('/tresor_trie' , methods=['POST'])
@jwt_required()
def tresor_trie():
    cout=Cout.query.all()
    entree=Commande.query.all()
    admin=get_jwt_identity()
    data=request.get_json()

    if admin not in ['admin suppreme', 'admin secondaire']:
        return jsonify({'message':"Vous n'etes pas eligible"})
    if not cout or not entree:
        return jsonify({'message':"Pas de donnnes a analiser"})
    dateTo=datetime.strptime(data.get('dateTo3'),'%Y-%m-%d')
    dateTo_final=datetime.combine(
        dateTo,
        time(
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second
        )
    )

    dateFrom=datetime.strptime(data.get('dateFrom3'),'%Y-%m-%d')
    dateFrom_final=datetime.combine(
        dateFrom,
        time(
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second
        )
    )

    sortie=[]
    commande=[]
    for c in cout:
        sortie.append(
            {
                'date':c.date,
                'prix':c.prix,
                'type':'-'
            }
        )
    for x in entree:
        commande.append(
            {
                'date':x.date,
                'prix':x.prix_avancer,
                'type':'+'
            }
        )

    items= sortie + commande
    eligible=[]
    for y in items:
        if dateFrom_final <= datetime.strptime(str(y['date']),'%Y-%m-%d %H:%M:%S') <= dateTo_final:
            eligible.append(y)

    value=sum(z['prix'] for z in eligible if z['type']=='+') - sum(v['prix'] for v in eligible if v['type']=='-' )
    return{'data':value}
