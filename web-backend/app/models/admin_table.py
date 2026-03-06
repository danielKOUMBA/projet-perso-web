from app.extension import db

class Admin(db.Model):
    tablename='admin'
    id=db.Column(db.Integer,primary_key=True)
    email=db.Column(db.String,unique=True)
    password=db.Column(db.String)
    role=db.Column(db.String ,default='users')
