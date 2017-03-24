'use strict';

const express = require('express');
const mongoose = require('mongoose');

// Constants
const PORT = 8080;

// App
const app = express();

var dataModel = null;

// data 
var mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, function(error) {
  if (error) throw(error);
  console.log('connected to MongoDB!');

  dataModel = mongoose.model('Data', new mongoose.Schema({ name: String, age: Number }));

});


app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.post('/data', function (req, res) {
  dataModel.create(req.body, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    }
    else {
      res.status(200).json(result);
    } 
  });
});

app.get('/data', function (req, res) {
  dataModel.find({}, function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    }
    else {
      res.status(200).json(result);
    }
  });
});

app.get('/data/:id', function(req, res) {
  dataModel.findOne({ _id: req.params.id }).exec(function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    }
    else {
      res.status(200).json(result);
    }
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);