# -*- coding: utf-8 -*-
"""
Created on Fri Apr  3 19:03:11 2020

@author: Tanguy
"""
import urllib.request

from icalendar import Calendar
from icalendar import vDatetime

import datetime
from datetime import timedelta

import pandas as pd

import pymongo
from pymongo import MongoClient

client = MongoClient('localhost', 27017) # Connexion à mongo sur le port 27017

db = client.studentLifeD # On sélectionne la db Analytics

eventCollection = db.eventades # On sélectionne la collection users

adeCollection = db.ades

eventCollection.drop()
adeCollection.drop()

idu4url = "http://ade6-usmb-ro.grenet.fr/jsp/custom/modules/plannings/direct_cal.jsp?resources=2393&projectId=1&calType=ical&login=iCalExport&password=73rosav&lastDate=2030-08-14&firstDate=2019-01-01"

contents = urllib.request.urlopen(idu4url)

cal = Calendar.from_ical(contents.read())

myDf = pd.DataFrame(columns=['title','description','place','startTime','endTime','number','startTimeDate','endTimeDate'])

for event in cal.walk('vevent') :
    eventTitle = event["SUMMARY"].to_ical().decode("UTF-8")
    eventDescription = (event["DESCRIPTION"].to_ical().decode("UTF-8")).replace('\\n',' ')
    eventPlace = event["LOCATION"].to_ical().decode("UTF-8").replace('\\',' ')
    
    eventStartTime = (event["DTSTART"].dt+timedelta(hours=2)).strftime("%d-%m-%Y %H:%M")
    eventStartTimeDate = (event["DTSTART"].dt)
    eventEndTime = (event["DTEND"].dt+timedelta(hours=2)).strftime("%d-%m-%Y %H:%M")
    eventEndTimeDate = (event["DTEND"].dt)
    
    events=[]
    currentEvent={}
    currentEvent["title"]=eventTitle
    currentEvent["description"]=eventDescription
    currentEvent["place"]=eventPlace
    currentEvent["startTime"]=eventStartTime
    currentEvent["endTime"]=eventEndTime
    currentEvent["startTimeDate"]=eventStartTimeDate
    currentEvent["endTimeDate"]=eventEndTimeDate
    # print(currentEvent)
    # print("\n")
    myDf = myDf.append(currentEvent,ignore_index=True)

myDf = myDf.sort_values(by=['startTimeDate'])
occurencies = myDf["title"].value_counts()
count = {}

for key in occurencies.index :
    count[key]=1

# myDf = myDf.drop(['startTimeDate','endTimeDate'],axis=1)

ids = []
for index, row in myDf.iterrows():
    occurence = count[row["title"]]
    totalOccurence = occurencies[row["title"]]
    myDf.loc[index,'number']=str(occurence)+"/"+str(totalOccurence)
    count[row["title"]]+=1
    document = {"title":row["title"],"description":row["description"],"place":row["place"],"startTime":row["startTimeDate"],"endTime":row["endTimeDate"],"occurence":row["number"]}
    res = eventCollection.insert_one(document)
    _id = res.inserted_id
    ids.append(_id)
    
adeCollection.insert_one({"filiere":"IDU4-A1","events":ids})


    
    
    
    
    
    
