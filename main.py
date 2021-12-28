from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
@app.route("/homepage", methods=["GET", "POST"])
def main():
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



if __name__ == "__main__":
    app.run(debug=True)    