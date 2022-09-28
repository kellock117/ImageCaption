from controller.captioning_controller import apiCaption
from controller.history_controller import apiSaveData, apiViewHistory
from controller.translation_contorller import apiTranslateLang
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/caption")
async def caption(image: UploadFile = File(...)) -> str:
    readImage = await image.read()

    # produce the caption
    caption = apiCaption(readImage)
    
    # save the image and caption information
    status = apiSaveData(image, caption)

    return caption if status else "Something went wrong"


@app.get("/history")
async def history() -> list:
    return await apiViewHistory()


@app.post("/translate")
def translate(text: str = Body(), translateTo: str = Body()) -> str:
    return apiTranslateLang(text, translateTo)