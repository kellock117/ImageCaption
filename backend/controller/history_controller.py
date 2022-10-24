# import sys
# sys.path.append('C:/Users/docto/vscodeProject/fyp/backend/entity')

from entity.history import saveHistory, saveVQAHistory, viewHistory, viewVQAHistory


def apiSaveData(image, text: str) -> bool:
    return saveHistory(image, text)

def apiSaveVQAData(image, question: str, answer: str) -> bool:
    return saveVQAHistory(image, question, answer)

async def apiViewHistory() -> list:
    return viewHistory()

async def apiViewVQAHistory() -> list:
    return viewVQAHistory()

