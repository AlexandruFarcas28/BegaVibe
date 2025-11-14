# BegaVibe
Discover all the latest events, festivals, and cultural happenings in Timișoara


# === Frontend (Expo React Native) ===

# creează proiectul
npx create-expo-app BegaVibe

# intră în proiect
cd BegaVibe

# pornește serverul de dev
npm start

# (opțional, pentru suport web)
npx expo install react-dom react-native-web


# === Backend (Flask + MongoDB) ===

# creează folder backend
mkdir backend
cd backend

# creează și activează virtualenv
python -m venv venv
venv\Scripts\activate

# instalează dependențele
pip install flask flask-bcrypt flask-cors pymongo python-dotenv

# pornește serverul Flask
python app.py
