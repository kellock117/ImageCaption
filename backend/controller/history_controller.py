from entity.history import saveHistory, saveVQAHistory, viewHistory, viewVQAHistory

def apiSaveData(readImage, fileName: str, text: str) -> bool:
    return saveHistory(readImage, fileName, text)

def apiSaveVQAData(readImage, fileName: str, question: str, answer: str) -> bool:
    return saveVQAHistory(readImage, fileName, question, answer)

async def apiViewHistory() -> list:
    return viewHistory()

async def apiViewVQAHistory() -> list:
    return viewVQAHistory()

