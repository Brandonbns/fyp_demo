import os

import joblib
import pandas as pd
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder, StandardScaler

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


def bin_fico_scores(df):
    ranges = [0, 580, 670, 740, 800, float('inf')]
    labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Exceptional']
    df['last_fico_range_high'] = pd.cut(
        df['last_fico_range_high'], bins=ranges, labels=labels, right=False)
    label_encoder = LabelEncoder()
    label_encoder.fit(labels)
    df['last_fico_range_high'] = label_encoder.transform(
        df['last_fico_range_high'])
    return df


@app.route('/personal_loans', methods=['POST'])
def predict():
    data = request.json

    sample = {
        'loan_amnt': data.get('loan_amnt'),
        'int_rate': data.get('int_rate'),
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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
