from app import create_app
import pytest
from app.models import Admin
from app.extension import db

@pytest.fixture
def client():
    app=create_app()
    app.testing=True
    with app.test_client() as client:
       
        yield client
        