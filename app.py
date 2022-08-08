# Aspect Ratio Calculator - 2022

# Import Librarys
import os
from flask import Flask, render_template, send_from_directory
#from flask import request,  session, request, flash, jsonify, redirect
from flask_cors import CORS
#from flask_cors import cross_origin
#from numpy import size
from custom_functions import *
from custom_proportions import *

# Configure application
#---> Defined static_url_path=""
app = Flask(__name__, static_folder="")

CORS(app, support_credentials=True)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.after_request
def after_request(response):
    """ Cache 200 """
    #response.headers["Cache-Control"] = "max-age=200"
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Index Page
@app.route("/")
def index():
    mode = "Custom Size"
    title = "Aspect Ratio Calculator"
    placeholder = placeholder_default
    return render_template('index.html', title=title, mode=mode, placeholder=placeholder)

# Preset Index Mode
@app.route("/<url_mode>")
def preset_mode_page(url_mode):
    if modeIsValid(url_mode):
        mode = modeIndex(url_mode, 0) + ":" + modeIndex(url_mode, 1)
        title = mode + " - Aspect Ratio Calculator"
        placeholder = placeholder_data.get(mode, placeholder_default)
    else:
        mode = "Custom Size"
        title = "Aspect Ratio Calculator"
        placeholder = placeholder_default
    
    return render_template('index.html', title=title, mode=mode, placeholder=placeholder)


# Contact Page
@app.route("/contact")
def contact_page():
    title = "Contact Us - Aspect Ratio Calculator"
    return render_template('contact.html', title=title)

# Terms Page
@app.route("/terms")
def terms_page():
    title = "Terms - Aspect Ratio Calculator"
    return render_template('terms.html', title=title)


@app.route('/sitemap.xml')
def sitemap_xml():
    return send_from_directory(os.path.join(app.root_path, 'static'),'sitemap.xml',mimetype='application/xml')


@app.route('/robots.txt')
def robots_txt():
    return send_from_directory(os.path.join(app.root_path, 'static'),'robots.txt',mimetype='text/plain')


# Debugger mode
if __name__ == '__main__':
    app.run(debug=True)
