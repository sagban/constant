import logging
import json
import azure.functions as func

from utils.predict import predict_fun


def main(req: func.HttpRequest) -> func.HttpResponse:
    req_body = req.get_json()
    n = req_body.get('nitrogen')
    temperature = req_body.get('temperature')
    ph = req_body.get('phh2o')
    humidity = req_body.get('humidity')
    rainfall = req_body.get('rainfall')
    print(n, temperature, ph, humidity, rainfall);
    if n is not None and temperature is not None and ph is not None and humidity is not None and rainfall is not None:
        return func.HttpResponse(predict_fun(n, ph, temperature, humidity, rainfall), status_code=200)
    else:
        return func.HttpResponse(
             "Invalid Parameters",
             status_code=400
        )