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
default_predicition_model_data = joblib.load(open(os.path.join(
    app.root_path, "models", "smes", 'default_prediction_model.pkl'), 'rb'))

# ls_scaler = joblib.load(
#     open(os.path.join(app.root_path, "models", "leases", 'scaler.pkl'), 'rb'))
# ls_model = joblib.load(
#     open(os.path.join(app.root_path, "models", "leases", 'xgbc_model.pkl'), 'rb'))


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


@app.route('/leases', methods=['POST'])
def predict_lease():
    data = request.json

    sample = {
        'disbursed_amount': data.get('disbursed_amount'),
        'asset_cost': data.get('asset_cost'),
        'ltv': data.get('ltv'),
        'date_of_birth': data.get('date_of_birth'),
        'employment_type': data.get('employment_type'),
        'disbursaldate': data.get('disbursaldate'),
        'aadhar_flag': data.get('aadhar_flag'),
        'pan_flag': data.get('pan_flag'),
        'voterid_flag': data.get('voterid_flag'),
        'driving_flag': data.get('driving_flag'),
        'passport_flag': data.get('passport_flag'),
        'perform_cns_score': data.get('perform_cns_score'),
        'perform_cns_score_description': data.get('perform_cns_score_description'),
        'pri_no_of_accts': data.get('pri_no_of_accts'),
        'pri_active_accts': data.get('pri_active_accts'),
        'pri_overdue_accts': data.get('pri_overdue_accts'),
        'pri_current_balance': data.get('pri_current_balance'),
        'pri_disbursed_amount': data.get('pri_disbursed_amount'),
        'sec_no_of_accts': data.get('sec_no_of_accts'),
        'sec_active_accts': data.get('sec_active_accts'),
        'sec_overdue_accts': data.get('sec_overdue_accts'),
        'sec_current_balance': data.get('sec_current_balance'),
        'sec_sanctioned_amount': data.get('sec_sanctioned_amount'),
        'sec_disbursed_amount': data.get('sec_disbursed_amount'),
        'primary_instal_amt': data.get('primary_instal_amt'),
        'sec_instal_amt': data.get('sec_instal_amt'),
        'new_accts_in_last_six_months': data.get('new_accts_in_last_six_months'),
        'delinquent_accts_in_last_six_months': data.get('delinquent_accts_in_last_six_months'),
        'average_acct_age': data.get('average_acct_age'),
        'credit_history_length': data.get('credit_history_length'),
        'no_of_inquiries': data.get('no_of_inquiries'),
    }

    df = pd.DataFrame(sample, index=[0])

    # Define a function to calculate age based on date of birth
    def age(dob):
        yr = int(dob.split('-')[0])
        if yr >= 0 and yr < 21:
            return yr + 2000
        else:
            return yr + 1900
    # Apply the age function to 'date_of_birth' column
    df['date_of_birth'] = df['date_of_birth'].apply(age)
    # Apply the age function to 'disbursaldate' column
    df['disbursaldate'] = df['disbursaldate'].apply(age)
    # Age of the customer at the time of disbursement of fund
    df['age'] = df['disbursaldate'] - df['date_of_birth']

    # Create an empty list to store the risk categories
    risk = []
    # Iterate over each element in the 'perform_cns_score_description' column
    for i in df['perform_cns_score_description']:
        # Check the description for different risk levels and append the corresponding risk category to the list
        if ('Very Low' in i):
            risk.append('Very Low Risk')
        elif ('Low' in i):
            risk.append('Low Risk')
        elif ('Medium' in i):
            risk.append('Medium Risk')
        elif ('Very High' in i):
            risk.append('Very High Risk')
        elif ('High' in i):
            risk.append('High Risk')
        else:
            risk.append('Not Scored')

    # Assign the 'risk' list to a new column 'risk' in the DataFrame
    df['risk'] = risk

    # Define a dictionary to map risk categories to numerical values
    risk_map = {'Not Scored': -1,
                'Very Low Risk': 4,
                'Low Risk': 3,
                'Medium Risk': 2,
                'High Risk': 1,
                'Very High Risk': 0}
    # Map the 'risk' column using the risk_map dictionary
    df['risk'] = df['risk'].map(risk_map)

    # Define a function to calculate the duration in months
    def duration(dur):
        # Extract the number of years and months from the duration string
        yrs = int(dur.split(' ')[0].replace('yrs', ''))
        # Calculate the total duration in months by multiplying years with 12 and adding months
        mon = int(dur.split(' ')[1].replace('mon', ''))
        return yrs*12+mon

    # Apply the 'duration' function to convert 'credit_history_length' column to duration in months
    df['credit_history_length'] = df['credit_history_length'].apply(duration)
    # Apply the 'duration' function to convert 'average_acct_age' column to duration in months
    df['average_acct_age'] = df['average_acct_age'].apply(duration)

    # Calculate the total number of accounts
    df['no_of_accts'] = df['pri_no_of_accts'] + df['sec_no_of_accts']
    # Calculate the total number of active accounts
    df['active_accts'] = df['pri_active_accts'] + df['sec_active_accts']
    # Calculate the total number of overdue accounts
    df['overdue_accts'] = df['pri_overdue_accts'] + df['sec_overdue_accts']
    # Calculate the total outstanding amount
    df['outstanding_amount'] = df['pri_current_balance'] + \
        df['sec_current_balance']
    # Calculate the total sanctioned amount
    df['sanctioned_amount'] = df['pri_sanctioned_amount'] + \
        df['sec_sanctioned_amount']
    # Calculate the total disbursed amount
    df['psdisbursed_amount'] = df['pri_disbursed_amount'] + \
        df['sec_disbursed_amount']
    # Calculate the total installment amount
    df['install_amt'] = df['primary_instal_amt'] + df['sec_instal_amt']

    # Store the result in a new column named 'log_outstanding_amount'
    df['log_outstanding_amount'] = np.log(
        df['outstanding_amount']+1-min(df['outstanding_amount']))

    expected_order = pl_xgb_model.get_booster().feature_names

    scaled_df = pd.DataFrame(ls_scaler.transform(
        df[expected_order]),  columns=expected_order)

    prediction = ls_model.predict(scaled_df)[0]

    return jsonify({'loan_status': int(prediction)})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
