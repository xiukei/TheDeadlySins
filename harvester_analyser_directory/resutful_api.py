from flask import Flask, request
import json
from geotask import geo_analyser
from sentimenttask import anger_analyser


app = Flask(__name__)

@app.route('/geoTask', methods=['POST'])
def geoTask():
    data = request.get_data()
    #trun into dic
    data_dic = json.loads(data)
    # call geo analyser
    geo_analyser(data_dic)
    # print(data_dic)
    return json.dumps(data_dic)

@app.route('/sentimentTask', methods=['POST'])
def sentimentTask():
    data = request.get_data()
    #trun into dic
    data_dic = json.loads(data)
    # call anger analyser
    anger_analyser(data_dic)
    # print(data_dic)
    return json.dumps(data_dic)

if __name__ == "__main__":
    app.run(host='0.0.0.0')