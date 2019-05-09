#python packages:
import json
import time
from tweepy.streaming import StreamListener
from tweepy import Stream
from tweepy import OAuthHandler
import couchdb

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

# 172.26.38.133:5984
couch = couchdb.Server("http://%s:%s@172.26.38.89:5984/" % ('group41', '1029384756'))
if 'tagged_twit' in couch:
    db = couch['tagged_twit']
else:
    db = couch.create('tagged_twit')

class listener(StreamListener):

    def on_data(self, data):
        try:
            data_dic = json.loads(data)

            geo_analyser(data_dic)
            anger_analyser(data_dic)

            doc_id = data_dic["id_str"]
            doc = {"_id": doc_id, "tweet_data": data_dic}
            db.save(doc)
            print("saved: " + doc_id)

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


