import flask
import json
from backEnd import getDataForJson

from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "<h1>Financial Data</h1>"

@app.route('/data', methods=['GET'])
def apple_data():
    search = request.args.get("stock")
    print("Values received: " + search)
    if search is not None:
        stock = search
    else:
        stock = 'AAPL'
    dataCollect = getDataForJson(stock)
    print(dataCollect)
    data_set = {stock: dataCollect}
    json_dumps = json.dumps(data_set)
    return json_dumps

app.run()