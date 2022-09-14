from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from history.controller.py import apiSaveData
from captioning.py import caption


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/captioning")
async def caption(image: UploadFile = File(...)) -> str:
    # produce the caption
    caption = caption(image)
    # save the image and caption information
    apiSaveData(image, caption)

    return caption
