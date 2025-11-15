import os
from datetime import datetime, timedelta

import jwt
from flask import Flask, request, jsonify, g
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from functools import wraps

# Încarcă variabilele din .env
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

# ----------------- CONECTARE MONGO -----------------

MONGO_URI = os.getenv("MONGO_URI")  # ex: mongodb+srv://...
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "begavibe")

if not MONGO_URI:
    raise RuntimeError("Nu ai setat MONGO_URI în .env")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

# SCHIMBAT: Colecțiile users_col și organizers_col
users = db["users"] # SCHIMBAT: De la users_col la users
events_col = db["events"]
organizers = db["organizers"] # NOU & SCHIMBAT: De la organizers_col la organizers


# ----------------- JWT CONFIG -----------------

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"
JWT_EXP_DAYS = int(os.getenv("JWT_EXP_DAYS", "7"))


# MODIFICAT: Adaugă rolul ('user' sau 'organizer') în payload-ul JWT
def create_jwt_token(user):
    # Daca documentul user are 'role', il folosim; altfel, presupunem 'user'
    role = user.get("role", "user") 
    
    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "role": role,  # NOU: Rolul în token
        "exp": datetime.utcnow() + timedelta(days=JWT_EXP_DAYS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_jwt_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])


# MODIFICAT: Actualizeaza jwt_required pentru a cauta in ambele colectii (users si organizers)
def jwt_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Lipseste token-ul de autentificare"}), 401

        token = auth_header.split(" ", 1)[1].strip()

        try:
            payload = decode_jwt_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirat"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token invalid"}), 401

        user_id = payload.get("user_id")
        user_role = payload.get("role", "user") # Extrage rolul
        
        if not user_id:
            return jsonify({"error": "Token fara utilizator"}), 401

        try:
            user_obj_id = ObjectId(user_id)
        except Exception:
            return jsonify({"error": "Token invalid"}), 401
        
        # Caută utilizatorul în colecția corespunzătoare rolului din token
if __name__ == "__main__":            
    app.run(debug=True)