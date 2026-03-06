from flask_jwt_extended import get_jwt_identity,jwt_required
from app.models.Cout import Cout
from app.extension import db
from flask import Blueprint,request,jsonify
from datetime import datetime,time

chiffre_depense_bp=Blueprint('chiffre_depense_bp',__name__)

@chiffre_depense_bp.route('/chiffre_depense',methods=['POST'])
@jwt_required()
def chiffre_depense():
    data=request.get_json()
    admin=get_jwt_identity()
    depenses=Cout.query.all()

    if admin not in ['admin suppreme', 'admin secondaire']:
        return jsonify({'message':"Vous n'etes pas eligible"})
    if not depenses:
        return jsonify({'message':"Pas de donnnes a analiser"})
    dateTo_obj=datetime.strptime(str(data.get('dateTo2')),'%Y-%m-%d')
    dateToFinal=datetime.combine(
        dateTo_obj,
        time(
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second
        )
    )
    dateFrom=datetime.strptime(str(data.get('dateFrom2')),'%Y-%m-%d')
    dateFrom_final=datetime.combine(
        dateFrom,
        time(
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second
        )
    )
    depenses_all=[]
    depenses_accepter=[]

    for c in depenses:
        depenses_all.append({
            'prix':c.prix,
            'date':c.date,
            'type':c.nom
        })
    for x in depenses_all:
        if dateFrom_final <= datetime.strptime(str(x['date']),'%Y-%m-%d %H:%M:%S')<=dateToFinal :
            depenses_accepter.append(x)
    
    value=sum(x['prix'] for x in depenses_accepter)
    conception=sum(x['prix'] for x in depenses_accepter if x['type']=='Conception')
    marketing=sum(x['prix'] for x in depenses_accepter if x['type']=='Marketing')
    salaire=sum(x['prix'] for x in depenses_accepter if x['type']=='Salaire')
    transport_et_livraison=sum(x['prix'] for x in depenses_accepter if x['type']=='Transport et Livraison')
    autre=sum(x['prix'] for x in depenses_accepter if x['type']=='Autres')

    return jsonify({'data':value,
                    'conception':conception,
                    'marketing':marketing,
                    'salaire':salaire,
                    'TL':transport_et_livraison,
                    'autre':autre
                    })
    