import translators


def apiTranslateLang(text: str, translateTo: str) -> str:
    # the language of text is automatically detected
    # use google to translate the text received
    translated = translators.google(text, to_language=translateTo)

    return translated
