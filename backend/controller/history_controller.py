from entity.history import saveHistory, viewHistory


def apiSaveData(image, text) -> bool:
    # to avoid duplicated filename, concatenate timestamp after the file name
    return saveHistory(image, text)


def apiViewHistory() -> list:
    data = viewHistory()

    return data


print(apiViewHistory())
