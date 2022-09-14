from history.py import saveHistory


def apiSaveData(image, text):
    # to avoid duplicated filename, concatenate timestamp after the file name
    return saveHistory(image, text)
