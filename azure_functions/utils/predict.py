import json
import azure.functions as func
import pickle

model = pickle.load(open('../crop_recommendation_model/finalizedresult.pkl', 'rb'))
output = -1
def predict_fun(n, p, k, temperture, ph, humidity, rainfall):
    global output
    output = model.predict([[n, p, k, temperture, ph, humidity, rainfall]])
    return json.dumps(output.tolist())
