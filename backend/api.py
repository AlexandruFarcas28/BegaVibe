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

# AZncarc�� variabilele din .env
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

# ----------------- CONECTARE MONGO -----------------

MONGO_URI = os.getenv("MONGO_URI")  # ex: mongodb+srv://...
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "begavibe")

if not MONGO_URI:
    raise RuntimeError("Nu ai setat MONGO_URI Arn .env")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

users_col = db["users"]
events_col = db["events"]


# ----------------- JWT CONFIG -----------------

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"
JWT_EXP_DAYS = int(os.getenv("JWT_EXP_DAYS", "7"))


def create_jwt_token(user):
    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "exp": datetime.utcnow() + timedelta(days=JWT_EXP_DAYS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_jwt_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])


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
        if not user_id:
            return jsonify({"error": "Token fara utilizator"}), 401

        try:
            user_obj_id = ObjectId(user_id)
        except Exception:
            return jsonify({"error": "Token invalid"}), 401

        user = users_col.find_one({"_id": user_obj_id})
        if not user:
            return jsonify({"error": "Utilizator inexistent"}), 401

        g.current_user = user
        return f(*args, **kwargs)

    return wrapper


# ----------------- SEED EVENTS -----------------


def seed_events_if_empty():
    if events_col.count_documents({}) == 0:
        sample_events = [
            {
                "title": "Concert Rock Arn Timișoara",
                "date": "2025-11-20",
                "locationName": "Sala Capitol",
                "latitude": 45.7542,
                "longitude": 21.2272,
                "imageUrl": "https://via.placeholder.com/300x150?text=Concert",
                "createdAt": datetime.utcnow(),
            },
            {
                "title": "Festival de teatru",
                "date": "2025-11-22",
                "locationName": "Teatrul Național Timișoara",
                "latitude": 45.7549,
                "longitude": 21.2257,
                "imageUrl": "https://via.placeholder.com/300x150?text=Teatru",
                "createdAt": datetime.utcnow(),
            },
            {
                "title": "Târg de Crăciun",
                "date": "2025-12-01",
                "locationName": "Piața Victoriei",
                "latitude": 45.7537,
                "longitude": 21.2253,
                "imageUrl": "https://via.placeholder.com/300x150?text=Targ+de+Craciun",
                "createdAt": datetime.utcnow(),
            },
        ]
        events_col.insert_many(sample_events)


@app.before_request
def init_db():
    users_col.create_index("email", unique=True)
    seed_events_if_empty()


# ----------------- API AUTH -----------------


@app.post("/api/register")
def register():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email si parola necesare"}), 400

    if users_col.find_one({"email": email}):
        return jsonify({"error": "Email deja folosit"}), 400

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    result = users_col.insert_one(
        {
            "email": email,
            "passwordHash": password_hash,
            "createdAt": datetime.utcnow(),
        }
    )

    user = users_col.find_one({"_id": result.inserted_id})
    token = create_jwt_token(user)

    return jsonify({"message": "Cont creat cu succes", "token": token}), 201


@app.post("/api/login")
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email si parola necesare"}), 400

    user = users_col.find_one({"email": email})
    if not user:
        return jsonify({"error": "Email sau parola gresite"}), 401

    if not bcrypt.check_password_hash(user["passwordHash"], password):
        return jsonify({"error": "Email sau parola gresite"}), 401

    token = create_jwt_token(user)

    return jsonify({"message": "Autentificare reusita", "token": token}), 200


@app.get("/api/me")
@jwt_required
def get_me():
    user = g.current_user
    return (
        jsonify(
            {
                "id": str(user["_id"]),
                "email": user.get("email"),
                "createdAt": user.get("createdAt").isoformat()
                if user.get("createdAt")
                else None,
            }
        ),
        200,
    )


# ----------------- API EVENIMENTE -----------------


@app.get("/api/events")
def get_events():
    docs = list(events_col.find({}))
    result = []
    for e in docs:
        result.append(
            {
                "id": str(e["_id"]),
                "title": e.get("title"),
                "date": e.get("date"),
                "locationName": e.get("locationName"),
                "latitude": e.get("latitude"),
                "longitude": e.get("longitude"),
                "imageUrl": e.get("imageUrl"),
                "category": e.get("category"),
                "price": e.get("price"),
                "minAge": e.get("minAge"),
            }
        )
    return jsonify(result), 200


@app.post("/api/events")
def create_event():
    data = request.get_json() or {}

    title = (data.get("title") or "").strip()
    date = (data.get("date") or "").strip()
    location_name = (data.get("locationName") or "").strip()

    if not title or not date or not location_name:
        return (
            jsonify(
                {
                    "error": "Campurile 'title', 'date' si 'locationName' sunt obligatorii",
                }
            ),
            400,
        )

    event_doc = {
        "title": title,
        "date": date,
        "locationName": location_name,
        "imageUrl": data.get("imageUrl"),
        "category": data.get("category"),
        "price": data.get("price"),
        "minAge": data.get("minAge"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "createdAt": datetime.utcnow(),
    }

    result = events_col.insert_one(event_doc)
    event_doc["_id"] = result.inserted_id

    return (
        jsonify(
            {
                "id": str(event_doc["_id"]),
                "title": event_doc["title"],
                "date": event_doc["date"],
                "locationName": event_doc["locationName"],
                "imageUrl": event_doc.get("imageUrl"),
                "category": event_doc.get("category"),
                "price": event_doc.get("price"),
                "minAge": event_doc.get("minAge"),
                "latitude": event_doc.get("latitude"),
                "longitude": event_doc.get("longitude"),
            }
        ),
        201,
    )


if __name__ == "__main__":
    app.run(debug=True)

