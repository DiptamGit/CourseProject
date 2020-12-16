const fs = require('fs');
const readline = require('readline');
var express = require("express");
var cors = require('cors');
const { response } = require('express');

// async function processLineByLine() {
//   const fileStream = fs.createReadStream('output.txt');

//   const lines = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });

//   for await (const line of lines) {
//     if(line){
//       tweets.push(line);
//     }
//   }
// }

// processLineByLine();

var app = express();
app.use(cors())
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/tweets", (req, res, next) => {
  let tweets = []
  try {
    const data = fs.readFileSync('output.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        console.log(line);
        tweets.push(line);
    });
} catch (err) {
    console.error(err);
}
  res.json(tweets);
});

let fetch = async function(){
  let tweets = [];
  const rl = readline.createInterface({
    input: fs.createReadStream('output.txt'),
    output: process.stdout,
    terminal: false
  });

  rl.on('line', (line) => {
    tweets.push(line);
    console.log(line);
  });

  return tweets;
}