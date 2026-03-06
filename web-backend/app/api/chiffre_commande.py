from flask_jwt_extended import get_jwt_identity,jwt_required
from app.models.commande_table import Commande
from app.extension import db
from flask import Blueprint,request,jsonify
from datetime import datetime,time

chiffre_commande_bp=Blueprint('chiffre_commande_bp',__name__)

@chiffre_commande_bp.route('/chiffre_commande',methods=['POST'])
@jwt_required()
def chiffre_commande():
    data=request.get_json()
    admin=get_jwt_identity()
    commandes=Commande.query.all()

    if admin not in ['admin suppreme', 'admin secondaire']:
        return jsonify({'message':"Vous n'etes pas eligible"})
    if not commandes:
        return jsonify({'message':"Pas de donnnes a analiser"})
    dateTo_obj=datetime.strptime(str(data.get('dateTo')),'%Y-%m-%d')
    dateToFinal=datetime.combine(
        dateTo_obj,
        time(
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second
        )
    )
    dateFrom=datetime.strptime(str(data.get('dateFrom')),'%Y-%m-%d')
    dateFrom_final=datetime.combine(
        dateFrom,
        time(
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second
        )
    )
    commandes_all=[]
    commande_accepter=[]
    for c in commandes:
        commandes_all.append({
            'prix':c.prix_avancer,
            'date':c.date,
            'type':c.type
        })
    for x in commandes_all:
        if dateFrom_final <= datetime.strptime(str(x['date']),'%Y-%m-%d %H:%M:%S')<=dateToFinal :
            commande_accepter.append(x)
    value=sum(x['prix'] for x in commande_accepter)
    tee_shirt=sum(x['prix'] for x in commande_accepter if x['type']=='tee shirt')
    Basket=sum(x['prix'] for x in commande_accepter if x['type']=='Basket')
    chemise=sum(x['prix'] for x in commande_accepter if x['type']=='chemise')
    Polos=sum(x['prix'] for x in commande_accepter if x['type']=='Polos')
    Bijoux=sum(x['prix'] for x in commande_accepter if x['type']=='Bijoux')
    Pantalon=sum(x['prix'] for x in commande_accepter if x['type']=='Pantalon')
    return jsonify({'data': value,
                    'tee shirt':tee_shirt,
                    'Basket':Basket,
                    'chemise':chemise,
                    'Polos':Polos,
                    'Bijoux':Bijoux,
                    'Pantalon':Pantalon
                    })
   
       