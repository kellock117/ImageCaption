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
storage = firebase.storage()
database = firebase.database()


def saveHistory(image, text: str) -> bool:
    try:
        # to avoid duplicated filename, concatenate timestamp after the file name
        fileNameWithTimestamp = str(time.time()) + image.filename.split('.')[0]
        # save the image to the storage
        storage.child("images/" + fileNameWithTimestamp).put(image)

        # save the history information which contains file name and caption
        database.child("history").child(fileNameWithTimestamp).set(text)
    except e:
        print(e)

    return True


def viewHistory():
    # scrap all of the history information from the database
    historyInfo = database.child("History").get()

    return historyInfo


viewHistory()

# file = "test.jpg"
# filename, fileType = file.split('.')
# cfilename = str(time.time()).split('.')[0] + filename

# storage.child("images/" + cfilename).put(file)

# database.child("History").child(cfilename).set("33333333333333")
