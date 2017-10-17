var express = require('express');
var app = express();
require('dotenv').config();

app.use( express.static( 'public' ) );

var request = require('request');
var convert = require('xml-js');

app.get('/giphy/:searchParam', function(req, res) {
    console.log('in the giphy route', req.params.searchParam);

    request('https://api.giphy.com/v1/gifs/search?api_key=' + process.env.GIPHY_API_KEY + '&q=' + req.params.searchParam + '&=25&rating=G', function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        // send entire body or just parts
        res.status(200).send(JSON.parse(body));
    });
    
});



app.get('/bbg/:searchParam', function(req, res) {
    console.log('in the bbg route', req.params.searchParam);

    var base = 'https://www.boardgamegeek.com/xmlapi';
    var search = '/search?search=';
    var gameIn = req.params.searchParam;
    var type = '/boardgame/';
    var countReturn = '&exact=1';
    var idArray = [];
    var idString = '';
    var searchUrl = base + search + gameIn; 

    var search_options = {
        url: searchUrl,
        headers: {
            accepts: 'application/json'
        }
    };

    request(search_options, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        // Changes XML to JSON
        let xml = body;
        let result = convert.xml2js(xml, {compact: false, spaces: 4});

        let gameArray = result.elements[0].elements;
        
        for (var i = 0; i < 15; i++) {
            objId = gameArray[i].attributes.objectid;
            idArray.push(objId);
        };
        idString = idArray.toString();

        var idUrl = base + type + idString + '?';
        var id_options = {
            url: idUrl,
            headers: {
                accepts: 'application/json'
            }
        };

        console.log('idString', idString);
        console.log('idUrl:', idUrl);

        request(id_options, function(error, response, body) {
            // console.log('error:', error);
            // console.log('statusCode:', response && response.statusCode);
            // console.log('body:', body);
    
            let xml = body;
            let idResult = convert.xml2js(xml, {compact: false, spaces: 4});
    
            console.log('idResult:', idResult);
            res.status(200).send(idResult);
        });
    });
});


app.listen(3000, function(req, res) {
    console.log('on 3000');
});