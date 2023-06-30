from flask import Flask,redirect, request, jsonify
from flask_cors import CORS
import joblib
import sklearn
import numpy as np
import pandas as pd
import json
import math
import os

from modules.smes.smeModels import *
from modules.smes.smePreprocess import *

current_folder = os.getcwd()
print(current_folder)

app = Flask(__name__)
CORS(app)

print(os.path.join(app.root_path ,'models/smes/risk_classification_model.pkl'),"root path")

risk_clf_model_data = joblib.load(open(os.path.join(app.root_path ,'models/smes/risk_classification_model.pkl'), 'rb'))
credit_risk_clf_model_data = joblib.load(open(os.path.join(app.root_path ,'models\smes\credit_risk_classification_model.pkl'), 'rb'))
default_predicition_model_data = joblib.load(open(os.path.join(app.root_path ,'models\smes\default_prediction_model.pkl'), 'rb'))


@app.route('/SmeDefault', methods=['POST'])
def handle_post_request():
    risk_clf_model, features =  risk_clf_model_data
    credit_risk_clf_model, features =  credit_risk_clf_model_data
    default_predicition_model , features, target = default_predicition_model_data

    # Access the JSON data from the request body
    data = request.json
    print(data, '-------------------Recieved data-----------------------')
    # dummy inputs
    sme_inputs = np.array([preprocessSMEData(data)])
    cr_inputs = np.array([preprocessCRData(data)])
    predictions = PredictDefault(sme_inputs,cr_inputs, risk_clf_model, credit_risk_clf_model, default_predicition_model)

    # Process the data or perform any required operations
    # ...

    # Return a response (optional)
    return jsonify({'sme': data['sme_name'], "predictions": predictions})

if __name__ == '__main__':
    app.run()