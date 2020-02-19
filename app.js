const express = require('express');
const request = require('superagent');
const geoData = require('./data/geo.json');
const weatherData = require ('./data/darksky.json');
const cors = require('cors');
const app = express();
// need to use cors for some funny reason
app.use(cors());
// app.get grabs the url? and returns something
app.get('/', (req, res) => {
    res.json({
        message: 'hello! :D'
    });   
});

// create some global state for lat and lng, which we
// will need to use in both the geo and weather apis
// and also the ability to update state within those functions
// and use the new updated state onto the next function
let lat;
let lng;



app.get('/location', (req, respond) => {
    // in www.some-api.com?search=humboldt, 'location will be what 'search' declares.... aka 'humboldt because ?search=humboldt
    const location = request.query.search;

    const cityData = geoData.results[0];

    //update the global lat and lng state so that we can use this updated data state into our weather api function, since both weather api needs lat and lng to get the weather and we want to pass the lat and lng from the location api we update a global state
    lat = cityData.geometry.location.lat;
    lng = cityData.geometry.location.lng;

    respond.json({
        formatted_query: cityData.formatted_address,
        latitude: lat,
        longitude: lng,
    });
});


const getWeatherData = (lat, lng) => {
    return weatherData.daily.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000)
        };
    });
};


app.get('/weather', (req, res) => {
    const weatherData = getWeatherData(lat, lng);

    res.json(weatherData);
});



app.get('*', (req, res) => res.send('404 Message Yo'));



const port = process.env.PORT || 3000;

app.listen(port, () => { console.log('Were listening on port', port);
});