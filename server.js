const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session    = require('express-session');



const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
}

const secret_key = process.env.SESSION_SECRET || 'secret cat';
app.use(session({ 
  secret: secret_key,resave: true, 
  saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions 

// Add routes, both API and view
app.use(routes);
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/healthhubdb";
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
