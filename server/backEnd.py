import requests
import json


def getDataForJson(stock):
    dictDataStockTimeFrame = {}
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={}&apikey={}'.format(stock, key)
    response = requests.get(url)
    responseJson = response.json()
    seriesStock = responseJson["Time Series (Daily)"]
    valuesCollect = []
    for day in seriesStock:
        values = seriesStock[day]
        valuesCollect.append(values["1. open"])
    return constructFormatLineChart(valuesCollect)


def constructFormatLineChart(rawData):
    return [float(elem) for elem in rawData]
  






