import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import preprocessor as processor
import senti as sentiment
import json, sys
from profanity_check import predict, predict_prob

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/sentiment/monitor', methods=['GET'])
@cross_origin()
def api_monitor():
    filepath = 'C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/monitor.txt'
    response = []
    with open(filepath, errors='ignore') as f:
        for line in f:
                cleaned_line = processor.clean(line)
                custom_tokens = sentiment.remove_noise(sentiment.word_tokenize(cleaned_line))
                analyzed_sentiment = sentiment.classifier.classify(dict([token, True] for token in custom_tokens))
                data = {}
                data['tweet'] = line
                data['sentiment'] = analyzed_sentiment
                response.append(data)
    return json.dumps(response)


@app.route('/sentiment/search', methods=['GET'])
@cross_origin()
def api_search():
    filepath = 'C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/search.txt'
    response = []
    with open(filepath, errors='ignore') as f:
        for line in f:
            cleaned_line = processor.clean(line)
            custom_tokens = sentiment.remove_noise(sentiment.word_tokenize(cleaned_line))
            analyzed_sentiment = sentiment.classifier.classify(dict([token, True] for token in custom_tokens))
            data = {}
            data['tweet'] = line
            data['sentiment'] = analyzed_sentiment
            response.append(data)
    return json.dumps(response)

@app.route('/sentiment/trained', methods=['GET'])
@cross_origin()
def api_trained():
    data = sentiment.accuracy
    return json.dumps(data)

@app.route('/offensive', methods=['GET'])
@cross_origin()
def api_offensive():
    
    filepath = 'C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/search.txt'
    response = []
    with open(filepath, errors='ignore') as f:
        for line in f:
            profanity = []
            profanity.append(line);
            det_val =  predict(profanity)
            prob_val =  predict_prob(profanity)
            val_list = list(det_val)
            prob_list = list(prob_val)
            prediction = int(val_list[0])
            prediction_prob = float(prob_list[0])
            data = {}
            data['tweet'] = line
            data['prediction'] = prediction
            data['prob'] = prediction_prob
            response.append(data)
    return json.dumps(response)

app.run()