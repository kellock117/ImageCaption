# import sys
# sys.path.append('C:/Users/docto/vscodeProject/fyp/backend/entity')

from entity.history import saveHistory, viewHistory


def apiSaveData(image, text) -> bool:
    # to avoid duplicated filename, concatenate timestamp after the file name
    return saveHistory(image, text)


async def apiViewHistory() -> list:
    data = viewHistory()
    
    return data

