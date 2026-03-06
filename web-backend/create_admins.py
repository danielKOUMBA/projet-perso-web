from app.models import Admin
from app import create_app
from werkzeug.security import generate_password_hash
from app.extension import db

app=create_app()
with app.app_context():
    

        admin1 = Admin(email="danikoumba7@gmail.com",password=generate_password_hash('123daniel'))
        admin2 = Admin(email="mohamed@gmail.com",password=generate_password_hash('123momo'))
        admin3=Admin(email="champion@gmail.com",password=generate_password_hash('123champion'))
        admin1.role='admin suppreme'
        admin2.role='bonus'
        admin3.role='admin secondaire'
       
        db.session.add(admin1)
        db.session.add(admin2)
        db.session.add(admin3)
        db.session.commit()
    #  python -m waitress --host=0.0.0.0 --port=5000 wsgi:app