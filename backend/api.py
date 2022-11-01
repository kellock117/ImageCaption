from controller.captioning_controller import apiCaption
from controller.history_controller import apiSaveData, apiSaveVQAData, apiViewHistory, apiViewVQAHistory
from controller.translation_contorller import apiTranslateLang
from controller.vqa_controller import apiVQA

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Form, Body

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
async def caption(image: UploadFile = File(...), strategy: str = Form()) -> str:
    readImage = await image.read()

    # produce the caption
    caption = apiCaption(readImage, strategy)
    
    # save the image and caption information
    status = apiSaveData(readImage, image.filename, caption)
    await image.close()
    return caption if status else "Something went wrong"


@app.post("/vqa")
async def vqa(image: UploadFile = File(...), question: str = Form()) -> str:
    readImage = await image.read()
    
    answer = apiVQA(readImage, question) 

    status = apiSaveVQAData(readImage, image.filename, str(question), answer)
    await image.close()
    return answer if status else "Something went wrong"


@app.get("/history")
async def history() -> list:
    return await apiViewHistory()


@app.get("/vqaHistory")
async def VQAHistory() -> list:
    return await apiViewVQAHistory()


@app.post("/translate")
def translate(text: str = Body(), translateTo: str = Body()) -> str:
    return apiTranslateLang(text, translateTo)
