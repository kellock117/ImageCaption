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
    # to avoid duplicated filename, concatenate timestamp after the file name
    fileNameWithTimestamp = str(time.time()).split('.')[0] + image.filename.split('.')[0]
    # save the image to the storage
    storage.child("images/" + fileNameWithTimestamp).put(image.file)

    # save the history information which contains file name and caption
    database.child("history").child(fileNameWithTimestamp).set(text)

    return True


def saveVQAHistory(image, question: str, answer: str) -> bool:
    # to avoid duplicated filename, concatenate timestamp after the file name
    fileNameWithTimestamp = str(time.time()).split('.')[0] + image.filename.split('.')[0]
    # save the image to the storage
    storage.child("images/" + fileNameWithTimestamp).put(image.file)

    # save the history information which contains file name and caption
    database.child("vqa").child(fileNameWithTimestamp).set({"question": question, "answer": answer})

    return True


def viewHistory() -> list:
    data = []

    # scrap all of the history information from the database
    historyInfo = database.child("history").get()

    for history in historyInfo.each():
        key = history.key()
        caption = history.val()
        image = storage.child("images/" + key).get_url(None)

        data.append({"image": image, "caption": caption})

    return data


def viewVQAHistory() -> list:
    # scrap all of the history information from the database
    VQAInfo = database.child("vqa").get()

    return VQAInfo
