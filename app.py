"""
Short Info about Google Oauth2.0 and how it works:

Table of information how it works:

1) What is the Oauth2.0?

Oauth2.0 allows user to give permission for using this app and use it on their behalf.

2) What is the OIDC abbreviation? What does it mean? How it works?

Open ID Connect(OIDC) is an extension to Oauth2.0 providing features for your convenience. 

3) Google oauth2.0 flow plan:

1. Register your app with Google -> Google will provide a client id, and client secret

2. Your app will redirect users to an authorization URl to log in with Google account -> This happens on Google's server, the user credentials are not exposed

3. Google shows the user a consent screen(in which will be contained your data, access code to your application);

4. Google provides an auth code

5. My app exchanges this code for a token 

6. Your app includes the token with subsequent requests to Google

4) What OIDC doing?

1.Publishes a well known endpoint -> My app can retrieve config info about the provider. Similarly, retrieve  basic user info 
"""
import json
import os
import sqlite3

from flask import Flask, render_template, jsonify, request, redirect, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

from oauthlib.oauth2 import WebApplicationClient
import requests

from db import init_database_command
from user import User
print("Aaa")
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "801663922478-sg6opa1be1ur4vi5levltb957414auq1.apps.googleusercontent.com")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "KpAmXqKa1tEP2e4V6Yml4TEV")
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)


login_manager = LoginManager(app)
login_manager.init_app(app)

# Налаштування бд
try:
    print("putin")
    init_database_command()
    print("lox")
except BaseException:#sqlite3.OperationalError:
    pass  # По ідеї це вже повинно бути створено,тому юзаю pass

client = WebApplicationClient(GOOGLE_CLIENT_ID)

# Помічник Flask-Login, щоб забрати нашого кліента з нашої бд

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)    

@app.route("/")
@app.route("/homepage", methods=["GET", "POST"])
def main():
    
    if request.method == "POST":
        return 'Success', 200

    # if current_user.is_authenticated():
    #     return (
    #         "<p>Hey, {}! You are logged in! Email: {}</p>"
    #         "<div><p>Google Profile Picture:</p>"
    #         '<img src="{}" alt="Google profile pic"></img></div>'
    #         '<a class="button" href="/logout">Logout></a>'.format(
    #             current_user.name, current_user.email, current_user.profile_pic
    #         )
    #     )
    # else:
    #     return '<a class="button" href="/login">Google Login</a>'    

    return render_template("index.html")

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()   

@app.route("/login")
def login():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri = request.base_url + "/callback",
        scope = ["openid", "email", "profile"],
    )
    return redirect(request_uri)


@app.route("/login/callback")
def callback():
    code = request.args.get("code") # Отримуємо код авторизації який гугл відправив нам

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Готуємо і відправляємо запит щоб отримати токени 
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response = request.url,
        redirect_url = request.base_url,
        code = code
    )

    token_response = requests.post(
        token_url,
        headers = headers,
        data = body,
        auth = (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Парсимо наші токени
    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # Тут нам потрібно впевнитися що наш емеіл перевірений гуглом

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by google", 400    


    # Створюємо юзера в нашій БД з інформаціею від гугла
    user = User(
        id_ = unique_id, name = users_name, email = users_email, profile_pic = picture
    )   

    # Якщо цьогоюзера немає,то додаэмо його туди
    if not User.get(unique_id):
        User.create(unique_id, users_name, users_email, picture)

    login_user(user)

    # Відправляємо юзера до головної сторінки
    #чекай локалсторадж и используй в верстке
    return '''<script>localStorage.setItem('google',`%s`);window.location.href="/";</script>''' % user.get_id()#костылиус


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route("/modelX", methods=["GET", "POST"])
def modelX():
    return render_template("modelX.html")    

@app.route("/model3", methods=["GET", "POST"])
def model3():
    return render_template("model3.html")  


@app.route("/roadster", methods=["GET", "POST"])
def roadster():
    return render_template("roadster.html")   


@app.route("/modelY", methods=["GET", "POST"])
def ModelY():
    return render_template("modelY.html")    
    
    
@app.route("/tesla-store", methods=["GET", "POST"])
def store():
    return render_template("store.html")  

@app.route("/db.json")
def db_json():
    response = app.response_class(
        response=open("db.json","r",encoding="utf-8").read(),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == "__main__":
    app.run(ssl_context="adhoc")    