from entity.history import saveCaptionHistory, saveVQAHistory, viewCaptionHistory, viewVQAHistory

def apiSaveCaptionData(readImage, fileName: str, text: str) -> bool:
    return saveCaptionHistory(readImage, fileName, text)

def apiSaveVQAData(readImage, fileName: str, question: str, answer: str) -> bool:
    return saveVQAHistory(readImage, fileName, question, answer)

async def apiViewCaptionHistory() -> list:
    return viewCaptionHistory()

async def apiViewVQAHistory() -> list:
    return viewVQAHistory()

