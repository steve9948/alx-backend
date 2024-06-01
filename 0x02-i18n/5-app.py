#!/usr/bin/env python3
"""
A basic Flask app with internationalization support using Flask-Babel.

This app serves an index page with language detection based on the user's
preferences, an explicit locale parameter in the URL,
or user-specific settings.
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel


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


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)

# Simulated user database
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> dict:
    """
    Retrieves a user dictionary based on the 'login_as' URL parameter.

    Returns:
        dict: A user dictionary if the user ID exists, otherwise None.
    """
    user_id = request.args.get("login_as")
    if user_id is not None and int(user_id) in users:
        return users[int(user_id)]
    return None


@app.before_request
def before_request():
    """
    Function to run before each request.

    It sets the user in the global 'g' object based on the
    'login_as' URL parameter.
    """
    g.user = get_user()


@babel.localeselector
def get_locale() -> str:
    """
    Selects the best-matching language for localization based on user
    preferences, URL parameter, or user settings.

    Returns:
        str: The best-matching language code from the supported languages.
    """
    locale = request.args.get("locale")
    if locale in app.config["LANGUAGES"]:
        return locale
    if g.user and g.user.get("locale") in app.config["LANGUAGES"]:
        return g.user["locale"]
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/")
def index() -> str:
    """
    Renders the index page with language detection and localization.

    Returns:
        str: Rendered HTML content for the index page.
    """
    return render_template("5-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
