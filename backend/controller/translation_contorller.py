import translators


def apiTranslateLang(text: str, translateTo: str) -> str:
    # the language of text is automatically detected
    # use google to translate the text received
    return translators.google(text, to_language=translateTo)