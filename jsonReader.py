import pymongo
from pymongo import MongoClient
import json


client = MongoClient('localhost', 27017) # Connexion à mongo sur le port 27017

db = client.studentLifeD # On sélectionne la db Analytics

markes = db.marks # On sélectionne la collection users

courses = db.courses


with open("marks.json") as marks :
    markes.delete_many({})
    for line in marks:
        marks_json=json.loads(line)


        markes.insert_one(marks_json)
    marks.close()


with open("structureBySpe.json") as struct:
    courses.delete_many({})
    for line in struct:
        struct_json = json.loads(line)

        courses.insert_one(struct_json)
    struct.close()

