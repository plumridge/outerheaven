import os.path
import time
import json

import requests
import pymongo

import api_key

API_URI_TV = "https://api.themoviedb.org/3/search/tv"
API_URI_MOV = "https://api.themoviedb.org/3/search/movie"
API_URI_IMG = "https://image.tmdb.org/t/p/w342"

db = pymongo.MongoClient().ohdb.casts

IMG_PATH = '/mnt/c/hold/ohserv/static/posters/'

def checkKey(dict, key): 
      
    if key in dict.keys(): 
        return True
    else: 
        return False 

def downloadImg(title, uri):
    img_data = requests.get(uri).content

    print("Get " + title + " from " + uri)
    with open(IMG_PATH + title + ".jpg", 'wb+') as handler:
        handler.write(img_data)

for cast in db.find().sort('date', pymongo.DESCENDING):

    for show in cast['shows']:
        filename = IMG_PATH + show + ".jpg"
        if not os.path.isfile(filename):
            if show == cast['shows'][-1]:
                request_uri = API_URI_MOV
            else:
                request_uri = API_URI_TV
            request_uri = request_uri \
            + "?api_key=" + api_key.API_KEY \
            + "&query=" + show

            r = requests.get(request_uri)
            if r.status_code == 429: #hit the request limit
                print("API returned 429: hit the request limit")
                print("Sleeping for 11 seconds")
                time.sleep(11)

            r_dec = json.loads(r.text)
            if (checkKey(r_dec, 'results') and len(r_dec['results']) > 0 and r_dec['results'][0]['poster_path'] != None):
                img_uri = API_URI_IMG + r_dec['results'][0]['poster_path']
                downloadImg(show, img_uri)