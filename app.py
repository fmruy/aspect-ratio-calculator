# Aspect Ratio Calculator - 2022

# Import Librarys
#import os
import os
from flask import Flask, request, send_from_directory, session, request, flash, jsonify, redirect, render_template
from flask_cors import CORS, cross_origin

# Configure application
app = Flask(__name__, static_folder="")
#---> static_url_path=""

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
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # POST method
        print("Post method called")
        return redirect("/")
    else:
        # GET method
        title = "Aspect Ratio Calculator"
        return render_template('index.html', title=title)


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
