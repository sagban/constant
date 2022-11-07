import logging
import json
import azure.functions as func

from utils.predict import predict_fun


def main(req: func.HttpRequest) -> func.HttpResponse:
    req_body = req.get_json()
    n = req_body.get('n')
    p = req_body.get('p')
    k = req_body.get('k')
    temperture = req_body.get('temperture')
    ph = req_body.get('ph')
    humidity = req_body.get('humidity')
    rainfall = req_body.get('rainfall')

    if n and p and k and temperture and ph and humidity and rainfall:
        return func.HttpResponse(predict_fun(n, p, k, temperture, ph, humidity, rainfall))
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )