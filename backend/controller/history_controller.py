import sys
sys.path.append('/fyp/backend/entity')

from history.py import saveHistory, viewHistory

def apiSaveData(image, text) -> bool:
    # to avoid duplicated filename, concatenate timestamp after the file name
    return saveHistory(image, text)


def apiViewHistory() -> list:
    data = []
    historyInfo = viewHistory()

    for history in historyInfo.each():
        key = history.key()
        caption = history.val()
        image = storage.child("images/" + key).get_url(None)

        data.append({"image": image, "caption": caption})

    return data


print(apiViewHistory())
