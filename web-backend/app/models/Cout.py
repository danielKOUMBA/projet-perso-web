from app.extension import db
from datetime import datetime
from sqlalchemy import DateTime

class Cout(db.Model):
    tablename='cout'
     
    id=db.Column(db.Integer,primary_key=True)
    nom=db.Column(db.String)
    prix=db.Column(db.Integer,nullable=False)
    date=db.Column(DateTime,default=datetime.utcnow)
        