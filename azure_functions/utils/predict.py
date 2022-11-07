import json
import azure.functions as func
import pickle


model = pickle.load(open('./utils/finalizedresult.pkl', 'rb'))
output = -1
def predict_fun(n, ph, temperture, humidity, rainfall):
    global output
    output = model.predict([[n, temperture, humidity, ph, rainfall]])
    output = int(output)
    if output == 0:
        return json.dumps('apple')
    elif output == 1:
        return json.dumps('banana')
    elif output == 2:
        return json.dumps('blackgram')
    elif output == 3:
        return json.dumps('chickpea')
    elif output == 4:
        return json.dumps('coconut')
    elif output == 5:
        return json.dumps('coffee')
    elif output == 6:
        return json.dumps('cotton')
    elif output == 7:
        return json.dumps('grapes')
    elif output == 8:
        return json.dumps('jute')
    elif output == 9:
        return json.dumps('kidneybeans')
    elif output == 10:
        return json.dumps('lentil')
    elif output == 11:
        return json.dumps('maize')
    elif output == 12:
        return json.dumps('mango')
    elif output == 13:
        return json.dumps('mothbeans')
    elif output == 14:
        return json.dumps('mungbean')
    elif output == 15:
        return json.dumps('muskmelon')
    elif output == 16:
        return json.dumps('orange')
    elif output == 17:
        return json.dumps('papaya')
    elif output == 18:
        return json.dumps('pigeonpeas')
    elif output == 19:
        return json.dumps('pomegranate')
    elif output == 20:
        return json.dumps('rice')
    elif output == 21:
        return json.dumps('watermelon')
    else:
        return json.dumps('Not Found')
