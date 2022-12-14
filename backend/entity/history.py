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

def saveCaptionHistory(readImage, fileName: str, text: str) -> bool:
    # to avoid duplicated filename, concatenate timestamp after the file name
    fileNameWithTimestamp = str(time.time()).split('.')[0] + fileName
    # save the history information which contains file name and caption
    database.child("history").push({"fileName": fileNameWithTimestamp, "text": text})
    # save image to storage
    storage.child("images/" + fileNameWithTimestamp).put(readImage)

    return True


def saveVQAHistory(readImage, fileName: str, question: str, answer: str) -> bool:
    # to avoid duplicated filename, concatenate timestamp after the file name
    fileNameWithTimestamp = str(time.time()).split('.')[0] + fileName
    database.child("vqa").push({"fileName": fileNameWithTimestamp, "question": question, "answer": answer})
    # save image to storage
    storage.child("images/" + fileNameWithTimestamp).put(readImage)

    return True


def viewCaptionHistory() -> list:
    data = []

    # scrap all of the history information from the database
    historyInfo = database.child("history").get()

    for history in historyInfo.each():
        caption = history.val()
        image = storage.child("images/" + caption["fileName"]).get_url(None)
        data.append({"image": image, "caption": caption["text"]})

    return data


def viewVQAHistory() -> list:
    data = []

    # # scrap all of the history information from the database
    VQAInfo = database.child("vqa").get()

    for info in VQAInfo.each():
        vqa = info.val()
        image = storage.child("images/" + vqa["fileName"]).get_url(None)
        data.append({"image": image, "question": vqa["question"], "answer": vqa["answer"]})

    return data
