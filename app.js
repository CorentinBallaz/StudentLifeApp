// const http = require('http');
// const express = require('express');
// const app = express();

var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000;
var cors        = require('cors');
var cron = require('node-cron');
var app = express();
const {spawn} = require('child_process');
var initData = require("./data/loadData");
app.use(cors());


// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);


//Injection data to the DB (for prod) ...
initData.injectBDD()


// Demo Route (GET http://localhost:5000)
app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});

var routes = require('./api/routes');
app.use('/api',routes);






mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
const connection = mongoose.connection;



connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

connection.on('error', (err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);

