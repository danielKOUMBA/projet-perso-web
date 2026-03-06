from flask import Blueprint,jsonify
from app.extension import db
from app.models.commande_table import Commande
from app.models.Cout import Cout
from flask_jwt_extended import jwt_required
from datetime import datetime

tresorerie_items=Blueprint('tresorerie_items',__name__)

@tresorerie_items.route('/tresor_items',methods=['POST'])
@jwt_required()
def items():
    cout=Cout.query.all()
    entree=Commande.query.all()
   

    if not cout and not entree:
        return jsonify({'message':'Aucune information enregistrer'})
    sortie=[
        {
            'nom':c.nom,
            'prix':c.prix,
            'date':str(c.date),
            'reste_a_payer':0,
            'type':'sortie',
            'si':sum(i.prix_avancer for i in entree if datetime.strptime(str(i.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S'))-sum(y.prix for y in cout if datetime.strptime(str(y.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S')),
            'sf':sum(i.prix_avancer for i in entree if datetime.strptime(str(i.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S'))-sum(y.prix for y in cout if datetime.strptime(str(y.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S'))-int(c.prix)
        }
        for c in cout
    ]

    entre=[
        {
         'nom':c.nom,
         'prix':c.prix_avancer,
         'date':str(c.date),
         'reste_a_payer': float(c.prix_total)-float(c.prix_avancer) ,
         'type':'entree',
         'si':sum(i.prix_avancer for i in entree if datetime.strptime(str(i.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S'))-sum(y.prix for y in cout if datetime.strptime(str(y.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S')),
         'sf':sum(i.prix_avancer for i in entree if datetime.strptime(str(i.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S'))-sum(y.prix for y in cout if datetime.strptime(str(y.date),'%Y-%m-%d %H:%M:%S')<datetime.strptime(str(c.date),'%Y-%m-%d %H:%M:%S'))+int(c.prix_avancer)
        }
        for c in entree
    ]

    
    items=sortie+entre
    items_trie=sorted(
        items,
        key=lambda x:datetime.strptime(x['date'],'%Y-%m-%d %H:%M:%S'),
        reverse=True
    )

    return jsonify({
        'items':items_trie,
    })
    

