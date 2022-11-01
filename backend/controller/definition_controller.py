from pydictionary import Dictionary


def apiGetDefinition(word: str) -> list:
    dict = Dictionary(word, 2)

    return dict.meanings()
    