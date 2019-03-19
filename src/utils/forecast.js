const request = require('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/6e67ca53d96df1f3f7500513f1be5cfb/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (body.error) {
      callback('Unable to find weather data for coordinates. Please try your search again');
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is ${body.currently.precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;