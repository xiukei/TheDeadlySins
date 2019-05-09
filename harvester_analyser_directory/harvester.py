#python packages:
import json
import time
from tweepy.streaming import StreamListener
from tweepy import Stream
from tweepy import OAuthHandler

# import requests

#analysis tasks (must be in same directory):
from geotask import geo_analyser
from sentimenttask import anger_analyser

#-------------------------------------harvesting...-------------------------------------
ACCESS_TOKEN = '2198142297-rEOm1MbYc6fZ1TPTgeWqpkgxtmojRsOaf2ZJA3d'
ACCESS_SECRET = '2V7YWkMabv0tUqb4XskqBu13ciQsuWvwR5H9snPyXhYiU'
CONSUMER_KEY = 'zv08YzZHWuZI7WfRlZu4BtAXM'
CONSUMER_SECRET = 'WGCjDSpeehkcgCgQfzR2JqLQ6ooB2n7TBlZeck7wISF6sO2AMR'

GEOBOX_MELB = [144.7, -37.65, 144.85, -37.5]

GEOBOX_AUSTRALIA = [112.35, -43.56, 154.41, -10.16]

class listener(StreamListener):

    def on_data(self, data):
        try:
            data_dic = json.loads(data)

            geo_analyser(data_dic)
            anger_analyser(data_dic)

            # url = 'http://localhost:5000/geoTask'
            # header = {'content-type': 'application/json'}
            # r_geo = requests.post(url, data=json.dumps(data_dic), headers=header)
            # after_geo = r_geo.json()
            #
            # r_anger = requests.post(url, data=json.dumps(after_geo), headers=header)
            # after_anger = r_anger.json()

            data_json = json.dumps(data_dic)
            print(data_json)
            with open('twitter_data.json', 'a') as twitter_file:
                twitter_file.write(data_json+'\n')
            return True
        except BaseException as e:
            print(e)
            time.sleep(5)
            return True

    def on_status(self, status):
        print(status.text)

    def on_error(self, status_code):
        # returning False in on_data disconnects the stream
        if status_code == 420:
            print(status_code)
            return False

auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

twitterStream = Stream(auth=auth, listener=listener())

twitterStream.filter(locations=GEOBOX_AUSTRALIA)


