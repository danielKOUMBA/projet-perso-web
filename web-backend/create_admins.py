from app.models import Admin
from app import create_app
from werkzeug.security import generate_password_hash
from app.extension import db

app=create_app()
with app.app_context():
    

        admin2 = Admin.query.filter_by(email="Nguiemaurine2@gmail.com").first()
        admin3=Admin.query.filter_by(email="hobryskwadjo23@gmail.com").first()
        admin2.role='bonus'
        admin3.role='admin secondaire'
        admin3.password=generate_password_hash('123jhon')
      
        db.session.add(admin2)
        db.session.add(admin3)
        db.session.commit()
    #  python -m waitress --host=0.0.0.0 --port=5000 wsgi:app