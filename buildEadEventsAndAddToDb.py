# -*- coding: utf-8 -*-
"""
Created on Wed Apr 15 14:27:53 2020

@author: Tanguy
"""

import urllib.request

from icalendar import Calendar
from icalendar import vDatetime

import datetime
from datetime import timedelta
from datetime import date

import pandas as pd

import pymongo
from pymongo import MongoClient

client = MongoClient('localhost', 27017) # Connexion à mongo sur le port 27017

db = client.studentLifeD # On sélectionne la db Analytics

eventCollection = db.eventeads # On sélectionne la collection users

eadCollection = db.eads


db.eventCollection.drop()
db.eadCollection.drop()

eadIdu4Url = "http://ead-polytech.univ-savoie.fr/calendar/export_execute.php?userid=2813&authtoken=13051bf49a4754ed93c5616725899bbd1030002c&preset_what=all&preset_time=recentupcoming"

contents = urllib.request.urlopen(eadIdu4Url)

cal = Calendar.from_ical(contents.read())

myDf = pd.DataFrame(columns=['title','description','startTime','endTime','startTimeDate','endTimeDate'])

for event in cal.walk('vevent') :
    print(event)
    eventTitle = event["SUMMARY"].to_ical().decode("UTF-8")
    eventDescription = (event["DESCRIPTION"].to_ical().decode("UTF-8")).replace('\\n',' ')
    
    eventStartTime = (event["DTSTART"].dt).strftime("%d-%m-%Y")
    
    t = (event["DTSTART"].dt)
    eventStartTimeDate = datetime.datetime(t.year, t.month, t.day)
    
    
    eventEndTime = (event["DTEND"].dt).strftime("%d-%m-%Y")
    t = (event["DTEND"].dt)
    eventEndTimeDate = datetime.datetime(t.year, t.month, t.day)
    
    events=[]
    currentEvent={}
    currentEvent["title"]=eventTitle
    currentEvent["description"]=eventDescription
    currentEvent["startTime"]=eventStartTime
    currentEvent["endTime"]=eventEndTime
    currentEvent["startTimeDate"]=eventStartTimeDate
    currentEvent["endTimeDate"]=eventEndTimeDate
    
    myDf = myDf.append(currentEvent,ignore_index=True)

ids=[]
for index, row in myDf.iterrows():
    document = {"title":row["title"],"description":row["description"],"startTime":row["startTimeDate"],"endTime":row["endTimeDate"]}
    res = eventCollection.insert_one(document)
    _id = res.inserted_id
    ids.append(_id)
    
eadCollection.insert_one({"filiere":"IDU4-A1","events":ids})


