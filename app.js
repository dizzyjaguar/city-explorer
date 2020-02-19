const express = require('express');
// const request = require('superagent');
const geoData = require('./data/geo.json');
const weatherData = require ('./data/darksky.json');

const app = express();



// app.get grabs the url? and returns something
app.get('/', (req, res) => {
    res.json({
        message: 'hello! :D'
    });   
});



app.get('/location', (req, respond) => {
    const cityData = geoData.results[0];

    respond.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng,
    });
});



app.get('*', (req, res) => res.send('404 Message Yo'));



const port = process.env.PORT || 3000;

app.listen(port, () => { console.log('Were listening on port', port);
});