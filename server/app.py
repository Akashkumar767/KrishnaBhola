from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="yourpassword",
    database="studentdb"
)
cursor = db.cursor()

@app.route("/students", methods=["GET"])
def get_students():
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()
    return jsonify(rows)

@app.route("/students", methods=["POST"])
def add_student():
    data = request.json
    cursor.execute("INSERT INTO students (name) VALUES (%s)", (data["name"],))
    db.commit()
    return jsonify({"message": "Student added"}), 201

if __name__ == "__main__":
    app.run(debug=True)
