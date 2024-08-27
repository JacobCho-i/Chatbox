from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import predict_class, get_response 
import training
import os
import sys
import threading
import time

import json

app = Flask(__name__)
CORS(app)
index = 1
intents = json.loads(open('intents.json').read())

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    question = data["question"]
    prediction = predict_class(question.lower())
    print(prediction)
    response = get_response(prediction)
    
    return jsonify({'message': response}), 200

# TODO: check for duplicate values

@app.route('/add_pattern', methods=['POST'])
def add_pattern():
    data = request.json
    pattern = data["pattern"]
    target_tag = data["tag"]
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i['tag'] == target_tag:
            patterns = i['patterns']
            if (pattern not in patterns):
                patterns.append(pattern)
            i['patterns'] = patterns
            break
    with open('intents.json', 'w') as f:
        json.dump(intents, f)
    return jsonify({'message': "successfully added new pattern"}), 200

@app.route('/add_response', methods=['POST'])
def add_response():
    global intents
    data = request.json
    response = data["response"]
    target_tag = data["tag"]
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i['tag'] == target_tag:
            patterns = i['responses']
            if (response not in patterns):
                patterns.append(response)
            i['responses'] = patterns
            break
    with open('intents.json', 'w') as f:
        json.dump(intents, f)
    training.train()
    intents = json.loads(open('intents.json').read())
    return jsonify({'message': "successfully added new response"}), 200

@app.route('/add_tag', methods=['POST'])
def add_tag():
    def restart():
        time.sleep(3)
        os.execv(sys.executable, ['python'] + sys.argv)
    global intents
    data = request.json
    ex_response = data["response"]
    ex_pattern = data["pattern"]
    tag_name = data["tag"]
    list_of_intents = intents['intents']
    data_json = { "tag":tag_name, "patterns":[ex_pattern], "responses":[ex_response] }
    list_of_intents.append(data_json)
    with open('intents.json', 'w') as f:
        json.dump(intents, f)
    training.train()
    intents = json.loads(open('intents.json').read())  

    # TODO: check for thread
    threading.Thread(target=restart).start()
    return jsonify({'message': "successfully added new tag"}), 200


@app.route('/get_tag', methods=['POST'])
def get_tags():
    tags = []
    data = request.json
    question = data["question"]
    ints = predict_class(question)
    # list_of_intents = intents['intents']
    # for i in list_of_intents:
    for i in range(len(ints)):
        tags.append(ints[i]['intent'])
    tags.append("New tag")
    return jsonify({'tags': tags}), 200

@app.route('/get_patterns_with_tag', methods=['POST'])
def get_patterns_with_tag():
    data = request.json
    target_tag = data["tag"]
    patterns = []
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i['tag'] == target_tag:
            patterns = i['patterns']
    return jsonify({'patterns': patterns}), 200

@app.route('/get_responses_with_tag', methods=['POST'])
def get_responses_with_tag():
    data = request.json
    target_tag = data["tag"]
    responses = []
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i['tag'] == target_tag:
            responses = i['responses']
    return jsonify({'responses': responses}), 200

if __name__ == '__main__':
    app.run(debug=True)