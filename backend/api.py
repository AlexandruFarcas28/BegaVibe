import os
from datetime import datetime

from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

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

users_col = db["users"]
events_col = db["events"]


# ----------------- SEED EVENTS -----------------

def seed_events_if_empty():
    if events_col.count_documents({}) == 0:
        sample_events = [
            {
                "title": "Concert Rock în Timișoara",
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


@app.before_first_request
def init_db():
    # poți pune index-uri aici dacă vrei (ex. email unic)
    users_col.create_index("email", unique=True)
    seed_events_if_empty()


# ----------------- API AUTH -----------------

@app.post("/api/register")
def register():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email și parolă necesare"}), 400

    if users_col.find_one({"email": email}):
        return jsonify({"error": "Email deja folosit"}), 400

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    users_col.insert_one(
        {
            "email": email,
            "passwordHash": password_hash,
            "createdAt": datetime.utcnow(),
        }
    )

    return jsonify({"message": "Cont creat cu succes"}), 201


@app.post("/api/login")
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email și parolă necesare"}), 400

    user = users_col.find_one({"email": email})
    if not user:
        return jsonify({"error": "Email sau parolă greșite"}), 401

    if not bcrypt.check_password_hash(user["passwordHash"], password):
        return jsonify({"error": "Email sau parolă greșite"}), 401

    # aici poți genera JWT mai târziu; acum doar confirmăm
    return jsonify({"message": "Autentificare reușită"}), 200


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
            }
        )
    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True)
