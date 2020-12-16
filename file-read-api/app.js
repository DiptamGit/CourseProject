const fs = require('fs');
const readline = require('readline');
var express = require("express");
const { response } = require('express');

let tweets= [];
async function processLineByLine() {
  const fileStream = fs.createReadStream('output.txt');

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of lines) {
    if(line){
      tweets.push(line);
    }
  }
}
console.log("🚀 ~ file: app.js ~ line 15 ~ processLineByLine ~ response", tweets)

processLineByLine();

var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/tweets", (req, res, next) => {
    res.json(tweets);
   });