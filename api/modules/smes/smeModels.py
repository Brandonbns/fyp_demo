import numpy as np

# Risk Classification Model
def classifyRisk(inputs, risk_clf_model_data):
    model, features = risk_clf_model_data
    prediction = model.predict(inputs)
    # print(features, 'risk classification')
    return prediction

# credit risk classification model
def classifyCreditRisk(inputs, credit_risk_clf_model_data):
    model, features = credit_risk_clf_model_data
    prediction = model.predict(inputs)
    return prediction


# default prediction model
def PredictDefault(sme_inputs, cr_inputs , risk_clf_model, credit_risk_clf_model, default_predicition_model  ):
    # # Geting the risk cluster
    # risk_clf_model, features =  risk_clf_model_data
    risk_level =risk_clf_model.predict(sme_inputs)

    # getting the credit risk
    # credit_risk_clf_model, features =  credit_risk_clf_model_data
    credit_risk = credit_risk_clf_model.predict(cr_inputs)
    
    # appending credit risk and risk cluster
    combined_inputs = list(sme_inputs[0])
    # print(combined_inputs,"final inputs for default prediction before adding")
    
    risk_level , credit_risk = risk_level[0], credit_risk[0]
   
    combined_inputs.append(risk_level)
    combined_inputs.append(credit_risk)
    final_input = np.array([combined_inputs])

    # print(combined_inputs,"final inputs for default prediction")

    # performing default predictions
    # default_predicition_model , features, target = default_predicition_model_data
    default = default_predicition_model.predict(final_input)

    # print(features, 'default prediction')

    return({"risk_level":int(risk_level), "credit_risk":int(credit_risk), "default":int(default)})
