import os

import joblib
import pandas as pd
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder, StandardScaler

from modules.personal_loans.preprocess import bin_fico_scores
from modules.smes.smeModels import *
from modules.smes.smePreprocess import *

app = Flask(__name__)
CORS(app)

pl_cluster_model = joblib.load(os.path.join(
    app.root_path, "models", "personal_loans", 'risk_clustering.pkl'))
pl_xgb_model = joblib.load(os.path.join(app.root_path, "models",
                                        "personal_loans", 'xgb_model.pkl'))
pl_scaler_with_feature_names = joblib.load(os.path.join(
    app.root_path, "models",    "personal_loans", 'scaler_with_feature_names.pkl'))
pl_scaler = pl_scaler_with_feature_names['scaler']
pl_feature_names = pl_scaler_with_feature_names['feature_names']


risk_clf_model_data = joblib.load(open(os.path.join(
    app.root_path, "models", "smes", 'risk_classification_model.pkl'), 'rb'))
credit_risk_clf_model_data = joblib.load(open(os.path.join(
    app.root_path, "models", "smes", 'credit_risk_classification_model.pkl'), 'rb'))
# default_predicition_model_data = joblib.load(open(os.path.join(
#     app.root_path, "models", "smes", 'default_prediction_model.pkl'), 'rb'))


@app.route('/personal_loans', methods=['POST'])
def predict():
    data = request.json

    sample = {
        'loan_amnt': data.get('loan_amnt'),
        'int_rate': data.get('int_rate'),
        'term': data.get('term'),
        'annual_inc': data.get('annual_inc'),
        'dti': data.get('dti'),
        'last_fico_range_high': data.get('last_fico_range_high'),
        'last_fico_range_low': data.get('last_fico_range_low'),
        'debt_payments': data.get('debt_payments'),
    }

    sample_df = pd.DataFrame(sample, index=[0])
    sample_df = bin_fico_scores(sample_df)

    scaled_df = pd.DataFrame(pl_scaler.transform(
        sample_df[pl_feature_names]),  columns=pl_feature_names)
    sample_df[scaled_df.columns] = scaled_df

    cluster_label = pl_cluster_model.predict(sample_df[['dti']])[0]
    sample_df['cluster_label'] = cluster_label

    expected_order = pl_xgb_model.get_booster().feature_names

    prediction = pl_xgb_model.predict(sample_df[expected_order])[0]

    return jsonify({'loan_status': int(prediction), 'cluster_label': int(cluster_label)})


@app.route('/SmeDefault', methods=['POST'])
def handle_post_request():
    risk_clf_model, features = risk_clf_model_data
    credit_risk_clf_model, features = credit_risk_clf_model_data
    default_predicition_model, features, target = default_predicition_model_data

    # Access the JSON data from the request body
    data = request.json
    print(data, '-------------------Recieved data-----------------------')
    # dummy inputs
    sme_inputs = np.array([preprocessSMEData(data)])
    cr_inputs = np.array([preprocessCRData(data)])
    predictions = PredictDefault(
        sme_inputs, cr_inputs, risk_clf_model, credit_risk_clf_model, default_predicition_model)

    # Process the data or perform any required operations
    # ...

    # Return a response (optional)
    return jsonify({'sme': data['sme_name'], "predictions": predictions})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
