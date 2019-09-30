import json
import os
from datetime import datetime, timedelta
from shutil import copy, copyfile

f = open("../tweet.js")
tweets = json.load(f)

for tweet in tweets:
        date = datetime.strptime(tweet["created_at"], "%a %b %d %X %z %Y")
        date = date - timedelta(days=1) #UTC will end up on Sunday 
        dirname = datetime.strftime(date, "%Y%m%d")
        try:
                os.mkdir("../pics/" + dirname)
        except:
                print("Folder for " + dirname + " already exists")
        
pics_copied = 0
videos_copied = 0
for tweet in tweets:
        date = datetime.strptime(tweet["created_at"], "%a %b %d %X %z %Y")
        date = date - timedelta(days=1) #UTC will end up on Sunday
        dirname = datetime.strftime(date, "%Y%m%d")
        if "extended_entities" in tweet and "media" in tweet["extended_entities"]:
                if tweet["extended_entities"]["media"][0]["type"] == "photo":
                        fn_tokens = tweet["extended_entities"]["media"][0]["media_url"].split("/")
                        filename = tweet["id"] + "-" + fn_tokens[4]
                        copy("../tweet_media/" + filename, "../pics/" + dirname)
                        pics_copied = pics_copied + 1
                elif tweet["extended_entities"]["media"][0]["type"] == "video":
                        media_urls = tweet["extended_entities"]["media"][0]["video_info"]["variants"]
                        for url in media_urls:
                                if "bitrate" in url and url["bitrate"] == "832000":
                                        fn_tokens = url["url"].split("/")
                                        filename = tweet["id"] + "-" + fn_tokens[8].split("?")[0]
                                        copy("../tweet_media/" + filename, "../pics/" + dirname)
                                        videos_copied = videos_copied + 1

print("Pics copied " + str(pics_copied))
print("Videos copied " + str(videos_copied))






