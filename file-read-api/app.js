const fs = require('fs');
const readline = require('readline');
var express = require("express");
var cors = require('cors');
const { response } = require('express');

var app = express();
app.use(cors())
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/tweets/monitor", (req, res, next) => {
  let tweets = []
  try {
    const data = fs.readFileSync('monitor.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        //console.log(line);
        tweets.push(line);
    });
} catch (err) {
    console.error(err);
}
  res.json(tweets);
});

app.get("/tweets/search", (req, res, next) => {
  let tweets = []
  try {
    const data = fs.readFileSync('search.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        //console.log(line);
        tweets.push(line);
    });
} catch (err) {
    console.error(err);
}
  res.json(tweets);
});