import pyrebase
import os
from dotenv import load_dotenv

load_dotenv()

firebaseConfig = {
    "apiKey": os.environ.get('API_KEY'),
    "authDomain": os.environ.get('AUTH_DOMAIN'),
    "databaseURL": os.environ.get('DATABASE_URL'),
    "projectId": os.environ.get('PROJECT_ID'),
    "storageBucket": os.environ.get('STORAGE_BUCKET'),
    'messagingSenderId': os.environ.get('MESSAGING_SENDER_ID'),
    'appId': os.environ.get('APP_ID'),
    'measurementId': os.environ.get('MEASUREMENT_ID')
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

id = input("Enter your ID: ")
password = input("Enter your password: ")
auth.sign_in_with_email_and_password(id, password)
print("ok")
