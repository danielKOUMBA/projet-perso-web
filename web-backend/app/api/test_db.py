from flask import Flask, jsonify,Blueprint
from sqlalchemy import text
from app.extension import db  # ton objet SQLAlchemy

db_bp=Blueprint('db_bp',__name__)

@db_bp.route("/test-db")
def test_db():
    try:
        with db.engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))  # <-- text() obligatoire
            first = result.scalar()
        return jsonify({"db_connected": True, "result": first})
    except Exception as e:
        return jsonify({"db_connected": False, "error": str(e)})