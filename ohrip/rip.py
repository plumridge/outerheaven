#!/usr/bin/python

import datetime
import string
import os

from pymongo import MongoClient

def has_banned_word(line):
    words = [
        "lyrai",
        "topic",
        "vlc",
        "remedial",
        "ponies",
        "discontinued",
        "bongo next week",
        "://",
    ]
    for w in words:
        if line.lower().find(w) != -1:
            return True
    return False

class Cast:
    def __init__(self, date, tags, shows):
        self.date = date
        self.tags = tags
        self.shows = shows

class Topic:
    def __init__(self, date, topic):
        self.date = date
        self.topic = topic

def get_casts_schedule():
    casts = []

    f = open("logs/schedule.txt", "r")
    schedule = f.readlines()

    for line in schedule:
        shows = []

        cast_line = line.split("|")
        #first token contains date and first show
        first = cast_line.pop(0)
        first = first.split(":")
        date_line = first[0]
        cast_line.insert(0, first[1])
        if date_line.find("remedial") != -1:
            continue
        
        for show in cast_line:
            shows.append(show.strip())

        date_line = date_line.split("-")
        year = date_line[1]
        month = date_line[2]
        day_str = date_line[3].split(".")
        day = day_str[0]

        if int(month) > 12 or int(day) > 31:
            date = "19990101"
        else:
            date = year + month + day
        casts.append(Cast(date, ["~~PLACEHOLDER!!~~"], shows))
    return casts

def get_casts_patito():
    topics = []
    dir = "logs/patito"
    for log in os.listdir(dir):
        date_toks = log.split(".")
        date_str = date_toks[1]
        if date_toks[1] == "EsperNet" or date_toks[1] == "Espernet":
            date_str = date_toks[2]
    
        date = datetime.datetime.strptime(date_str, "%Y%m%d")
        if date.weekday() == 5:
            with open(dir + "/" + log, "r", encoding="utf-8", errors="ignore") as logfile:
                for line in logfile:
                    if line.find("Topic") != -1:
                        topics.append(Topic(date, line))
                        break
    topics.sort(key=lambda t: t.date)
    topics.reverse()
    for t in topics:
        if t.date.year >= 2011:
            print(str(t.date) + "\n")
            for tok in t.topic.split("|"):
                print(''.join(filter(lambda x: x in string.printable, tok)))
    print(len(topics))

def get_casts_smiler():
    casts = []
    with open("logs/smiler.log") as f:
        last_date = None
        for line in f.readlines():
            if line.find("Topic") != -1:
                date_str = line.split("]")[0].split("[")[1]
                date = datetime.datetime.strptime(date_str, "%A, %b %d, %Y")
                if date.weekday() == 5 and date != last_date:
                    shows = []
                    last_date = date
                    for x in line.split("|"):
                        if has_banned_word(x):
                            continue
                        # if x.find("://") != -1:
                        #     break
                        print(x)
                        shows.append(x)
                    if len(shows) > 0:
                        cast = Cast(date.strftime("%Y%m%d"), [], shows)
                        casts.append(cast)
    casts.reverse()
    for cast in casts:
        print("~~~~~~~~~~~~~~~")
        print(cast.date)
        for show in cast.shows:
            print(show)

def store_casts(casts):
    posts = []
    for cast in casts:
        post = {
            "date": cast.date,
            "tags": cast.tags,
            "shows": cast.shows
        }
        posts.append(post)
    client = MongoClient()
    db = client.ohdb
    casts_db = db.casts
    for cast in casts:
        if casts_db.count_documents({'date': cast.date}) == 0:
            casts_db.insert_one(cast)
        else:
            print("Cast for date " + cast.date + " already exists")

    cursor = casts_db.find({})
    for doc in cursor:
        print(doc)

#casts = get_casts_schedule()
#store_casts(casts)
#get_casts_patito()
get_casts_smiler()
