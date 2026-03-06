# application factory
from flask import Flask
from app.Config import Config
from dotenv import load_dotenv
from app.extension import db,migrate,cors,jwt
import os
from app.api import register_bluprint


load_dotenv()

def create_app(config_class=Config):
    app=Flask(__name__)
    app.secret_key=os.getenv('JTW_SECRET_KEY')
    app.config.from_object(config_class)

    db.init_app(app)
    with app.app_context():
        db.create_all()
    migrate.init_app(app,db)
    cors.init_app(app,supports_credentials=True,origins=['http://localhost:5173'])
    jwt.init_app(app)
    if app.config.get('TESTING'):
        return app
   
 
    
    
# importer blueprint et instance celery
    register_bluprint(app)

    return app
