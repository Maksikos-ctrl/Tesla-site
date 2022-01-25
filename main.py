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

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

app = Flask(__name__)

@app.route("/")
@app.route("/homepage", methods=["GET", "POST"])
def main():
    
    if request.method == "POST":
        return 'Success', 200


    return render_template("index.html")

@app.route("/modelX")
def modelX():
    return render_template("modelX.html")    

@app.route("/model3")
def model3():
    return render_template("model3.html")  


@app.route("/roadster")
def roadster():
    return render_template("roadster.html")   


@app.route("/modelY")
def ModelY():
    return render_template("modelY.html")    
    
    
@app.route("/tesla-store")
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
    app.run(debug=True)    