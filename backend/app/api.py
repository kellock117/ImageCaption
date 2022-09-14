from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from backend.controller.history_controller.py import apiSaveData, apiViewHistory
from backend.controller.captioning_controller.py import caption


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


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome."}


@app.post("/captioning")
async def caption(image: UploadFile = File(...)) -> str:
    # produce the caption
    caption = apiCaption(image)
    # save the image and caption information
    status = apiSaveData(image, caption)

    return caption if status else "Something went wrong"


@app.get("/history")
async def history() -> list:
    return apiViewHistory()
