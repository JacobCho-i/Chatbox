from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import predict_class, get_response 

app = Flask(__name__)
CORS(app)
index = 1

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    question = data["question"]
    prediction = predict_class(question.lower())
    response = get_response(prediction)
    
    return jsonify({'message': response}), 200

if __name__ == '__main__':
    app.run(debug=True)