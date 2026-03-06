from flask import Blueprint,jsonify,request
from app.models import Commande
from flask_jwt_extended import jwt_required,get_jwt_identity
from datetime import datetime,time
from app.extension import db



commande_bp=Blueprint('commande_bp',__name__)

@commande_bp.route('/commande',methods=['POST'])
@jwt_required()
def Commandes():
    admin=get_jwt_identity()
    data=request.get_json()
  

    if admin=='admin suppreme' or admin=='admin secondaire':
        prix_avancer=int(data.get('prix_avancer'))
        prix_total=int(data.get('prix_total'))
        status=''
        if float(data.get('prix_avancer'))<float(data.get('prix_total')):
            status='partiellement payer'
        else:
            status='payer'
        date_str=data.get('date')
        date_ob=datetime.strptime(date_str,'%Y-%m-%d').date()
      

        date_final=datetime.combine(
            date_ob,
            time( 
            hour=datetime.utcnow().hour,
            minute=datetime.utcnow().minute,
            second=datetime.utcnow().second)
        )

        commandes=Commande(nom=data.get('nom'),
                            numero=data.get('numero'),
                            produits=data.get('produit'),
                            status=status,
                            date=date_final,
                            type=data.get('type'),
                            prix_avancer=prix_avancer,
                            prix_total=prix_total)
        db.session.add(commandes)
        db.session.commit()
        return jsonify({
            'message':'Commande enregister avec succes'
            }),201

       
    
    return jsonify({
        'erreur':"Vous n'etes pas eligible"
    })


