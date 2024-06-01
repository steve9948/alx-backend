#!/usr/bin/env python3
"""
A basic Flask app with internationalization support using Flask-Babel.

This app serves an index page with language detection based on the user's
preferences.
"""

from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

class Config:
    """
    Configuration settings for the Flask app.

    Attributes:
        LANGUAGES (list): Supported languages for localization.
        BABEL_DEFAULT_LOCALE (str): Default language.
        BABEL_DEFAULT_TIMEZONE (str): Default timezone.
    """

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"

app.config.from_object(Config)

@babel.localeselector
def get_locale() -> str:
    """
    Selects the best-matching language for localization based on user
    preferences.

    Returns:
        str: The best-matching language code from the supported languages.
    """
    return request.accept_languages.best_match(app.config["LANGUAGES"])

@app.route("/")
def index() -> str:
    """
    Renders the index page with language detection and localization.

    Returns:
        str: Rendered HTML content for the index page.
    """
    return render_template("3-index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
