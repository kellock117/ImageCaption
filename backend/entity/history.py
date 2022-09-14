import os
import pyrebase
import time
from dotenv import load_dotenv

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


def saveHistory(image, text):
    try:
        # to avoid duplicated filename, concatenate timestamp after the file name
        filename = image.filename + str(time.time())
        # save the image to the storage
        storage = firebase.storage()
        storage.child("images/" + filename).put(image)
        # save the history information which contains file name and caption
        database = firebase.database()
        database.child("History").push(
            {"filename": filename, "caption": caption})
    except e:
        print(e)

    return True


# filename = "test.jpg"
# cfilename = filename + str(time.time())
# storage = firebase.storage()
# storage.child("images/" + cfilename).put(filename)
# database = firebase.database()
# database.child("History").push(
#     {"filename": cfilename, "caption": "fffffffffddfdf"})
