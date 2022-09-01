import pyrebase
import os
from dotenv import load_dotenv

load_dotenv()

# setup environment
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

# receive personal information from client for authentication
id = input("Enter your ID: ")
password = input("Enter your password: ")

# check whethe input is valid. If not return error message
try:
    auth.sign_in_with_email_and_password(id, password)
    print("ok")
except:
    print("invalid user name or password")
