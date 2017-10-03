var express = require('express');
var app = express();

require('dotenv').config();

var request = require('request');

app.get('/giphy', function(req, res) {
    console.log('in the giphy route');

    request('https://api.giphy.com/v1/gifs/trending?api_key=' + process.env.GIPHY_API_KEY + '&limit=25&rating=G', function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        // send entire body or just parts
        res.status(200).send(JSON.parse(body));
    });
    
});

app.listen(3000, function(req, res) {
    console.log('on 3000');
});