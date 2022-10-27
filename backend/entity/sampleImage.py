import os
import pyrebase
from dotenv import load_dotenv


def sampleImage(fileName: str):
    load_dotenv()

    config = {
        "apiKey": os.getenv("API_KEY"),
        "authDomain": os.getenv("AUTH_DOMAIN"),
        "databaseURL": os.getenv("DATABASE_URL"),
        "projectId": os.getenv("PROJECT_ID"),
        "storageBucket": os.getenv("STORAGE_BUCKET"),
        "messagingSenderId": os.getenv("MESSAGE_SENDER"),
        "appId": os.getenv("APP_ID"),
        "measurementId": os.getenv("MEASUREMENT_ID")
    }

    firebase = pyrebase.initialize_app(config)
    storage = firebase.storage()

    image = storage.child("images/" + fileName + '.jpg').get_url(None)

    return image