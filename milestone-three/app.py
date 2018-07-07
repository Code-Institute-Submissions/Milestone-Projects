##### Imports #####

import os
from flask import Flask, render_template


##### Flask Configuration #####

app = Flask(__name__)


##### Routes and Views #####

@app.route("/")

def index():
    return render_template("index.html")
    




##### App Configuration and Debugging #####

app.run(host = os.getenv("IP"), port = os.getenv("PORT"), debug = True)