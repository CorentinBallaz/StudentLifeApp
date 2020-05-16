# StudentLifeApp
Student dashboard for polytech' students. Developing for PROJ831 course.

# Pour accéder à la plateforme :

https://polytech-student-dashboard.herokuapp.com/

Comme c'est hébergé gratuitement en ligne, il faut y aller doucement histoire que les données arrivent à se charger ;)

# Pour utiliser en local :

# NPM
dans le répertoire du projet :
- npm install

dans le dossier app :
- npm install

# Mongo

Lancer un serveur MongoDB sur le port 27017

# Python

Pour charger les données dans la DB, lancer les fichier 3 .py du répertoire dataToBdd

# Lancement

A la racine du projet : node app.js
Dans le dossier app : ionic serve

# Changement de l'adresse pour les appels à l'API 

app/src/environments --> environment.ts --> changer l'url par "http://localhost:5000" (ou https si vous rencontrez des problèmes avec CORS)