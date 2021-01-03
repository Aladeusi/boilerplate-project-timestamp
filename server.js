// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//parse request body
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

//increase request timeout globally
const TIMEOUT = 10000;

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function(req, res){
  try{
    //get current timestamp object
    const serializedTimestamp= new Date();
    //console.log(new Date().getTime());
    res.status(200).json({unix:serializedTimestamp.getTime(), utc:serializedTimestamp.toUTCString()})
  }catch(e){
    res.status(500).json({code:500, msg:"Some error ocurred. Please try again later.", data:e})
  }
  
})

app.get("/api/timestamp/:date_string", function(req, res){
  try{
    //pass date param from request scope
    let date= req.params.date_string;
    //console.log(typeof date)
    //convert millisecs to secs if number
    date = (!date.includes('-'))?Number(date): date;
    //covert to timestamp object
    const serializedTimestamp= new Date(date);
    //console.log(serializedTimestamp);
    toReturn= (serializedTimestamp.toString()=="Invalid Date")?{error:"Invalid Date"}:{unix:serializedTimestamp.getTime(), utc:serializedTimestamp.toUTCString()}
    res.status(200).json(toReturn)
  }catch(e){
    res.status(500).json({code:500, msg:"Some error ocurred. Please try again later.", data:e})
  }
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
