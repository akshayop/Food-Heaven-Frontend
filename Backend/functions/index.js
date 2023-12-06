const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const app = express(); //creating express app instance
require('dotenv').config();
const cors = require('cors');

const serviceAccountKey = require('./serviceAccountKey.json');

// Body parser
app.use(express.json());


// Cross orgin

app.use(cors({ origin: true }));
app.use(( req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});


// Firebase credential 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});



// api endpoints

app.use('/', require('./routes'));

exports.app = functions.https.onRequest(app);