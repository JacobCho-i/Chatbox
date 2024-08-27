import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer

import tensorflow as tf

lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = tf.keras.models.load_model('chatbot_model.h5')

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]

    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    
    return np.array(bag)

def predict_class(sentence):
    # reloading
    """
    global intents, words, classes, model
    intents = json.loads(open('intents.json').read())
    words = pickle.load(open('words.pkl', 'rb'))
    classes = pickle.load(open('classes.pkl', 'rb'))
    model = tf.keras.models.load_model('chatbot_model.h5')
    """

    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]

    ERROR_THRES = 0
    result = [[i, r] for i, r in enumerate(res) if r > ERROR_THRES]

    result.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in result:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents_json=intents):
    result = "I don't understand."
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result


isTraining = True
print("bot is running!")
while False:
    message = input("").lower()
    ints = predict_class(message)
    
    res = get_response(ints, intents)
    if not isTraining:
        print(res)
    else:
        print("is this correct tag? ", ints[0]['intent'])
        print(ints)
        print(ints[0]['intent'])
        ans = input("").lower()
        if ans == "yes":
            list_of_intents = intents['intents']
            patterns = []
            for i in list_of_intents:
                if i['tag'] == ints[0]['intent']:
                    patterns = i['patterns']
                    if (message not in patterns):
                        patterns.append(message)
                    i['patterns'] = patterns
                    break
            
            print("do you want to add another response? ")
            ans = input("").lower()
            if ans == "yes":
                print("type the response:")
                response = input("")
                responses = []
                for i in list_of_intents:
                    if i['tag'] == ints[0]['intent']:
                        responses = i['responses']
                        if (response not in responses):
                            responses.append(response)
                        i['responses'] = responses
                        break
            else:
                print(res)
            with open('intents.json', 'w') as f:
                json.dump(intents, f)
        else:
            found = False
            for i in range(1, len(ints)):
                print("is this correct tag? ", ints[i]['intent'])
                ans = input("").lower()
                if ans == "yes":
                    found = True
                    print("do you want to add another response? ")
                    ans = input("").lower()
                    if ans == "yes":
                        print("type the response:")
                        response = input("")
                        list_of_intents = intents['intents']
                        for i in list_of_intents:
                            if i['tag'] == ints[i]['intent']:
                                responses = i['responses']
                                if (response not in responses):
                                    responses.append(response)
                                i['responses'] = responses
                                with open('intents.json', 'w') as f:
                                    json.dump(intents, f)
                                break
                    break
            if found == False:
                print("please enter tag name for this new tag")
                tag = input("").lower()
                print("please enter the right response")
                response = input("")
                list_of_intents = intents['intents']
                data_json = { "tag":tag, "patterns":[message], "responses":[response]}
                #loaded_data = json.loads(data_json)
                list_of_intents.append(data_json)
                with open('intents.json', 'w') as f:
                    json.dump(intents, f)
                print("new tag added! it will be applied after the mode is trained again")

