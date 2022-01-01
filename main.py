from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route("/")
@app.route("/homepage", methods=["GET", "POST"])
def main():
    
    if request.method == "POST":
        return 'Success', 200


    return render_template("index.html")

@app.route("/modelX")
def modelX():
    return render_template("index.html")    

@app.route("/model3")
def model3():
    return render_template("index.html")  


@app.route("/roadster")
def roadster():
    return render_template("index.html")   


@app.route("/modelX")
def ModelY():
    return render_template("index.html")    
    
    
@app.route("/shop")
def slider():
    return render_template("index.html")  

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