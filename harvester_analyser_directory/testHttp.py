import requests
import json

url = 'http://localhost:5000/geoTask'
data = {"aaa" : "bbbb" }
header = {'content-type': 'application/json'}
r = requests.post(url,data= json.dumps(data), headers=header)
print(r.json()["aaa"])