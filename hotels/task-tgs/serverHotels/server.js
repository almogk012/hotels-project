var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var fs = require('fs');
var jsonfile = require('jsonfile');
var app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 8080;

var file = '../json/hotels.json';

app.post('/addHotel', function (req, res) {
    var newHotel = {};
    newHotel = req.body.newHotel;

    jsonfile.readFile(file, function (err, obj) {
        // Loop through all the objects in the array
        for (i = 0; i < obj.length; i++) {
            // Check each id against the newThing
            if (obj[i].name !== newHotel.name) {
                found = false;
                console.log('hotel ' + obj[i]._id + ' is exists. keep going.');
            } else if (obj[i].name == newHotel.name) {
                found = true;
                console.log('found it. stopping.');
                break;
            }
        }
        // if we can't find it, append it to the file
        if (!found) {
            var obj = require('../json/hotels.json');
            fs.writeFile(file, JSON.stringify(obj), function (err) {
                obj.push(newHotel);
                console.log(obj);
            });
        }
    });
});

app.listen(process.env.PORT || 4730);