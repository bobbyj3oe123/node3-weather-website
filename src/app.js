// express is actually a function
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set allows you to set a value for given express setting
// this sets up handlebars to be used with express
app.set('view engine', 'hbs');

// customized where are views are located
app.set('views', viewsPath);

// takes a path to the directory where your partials live
hbs.registerPartials(partialsPath);

// serve up a directory
// way to customize your server
// static means assest do not change
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  // render allows to render one of our views
  // second arg is an object with values you want the page to have access to
  res.render('index', {
    title: 'Weather',
    name: 'Robot man'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Robot Man'
  });
});

app.get('/help', (req, res) => {
  // you can use this object values to header
  res.render('help', {
    title: 'Help Page',
    message: 'Please help me',
    name: 'Robot Man'
  });
});

// this the endpoint to geocode the address
// json based endpoint
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
  if (error) {
    return res.send({ error });
  }

  forecast(latitude, longitude, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      forecast: response,
      location,
      address: req.query.address,
    });
  })
});

});

app.get('/products', (req, res) => {
  // common pattern for if else statement with to res statements
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  // constains the query object that you used on the browser wth ?
  console.log(req.query.search);

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: '!404 not found',
    name: 'Robot Man'
  });
});

// * wildcard match anything that hasn't been matched so far
app.get('*', (req, res) => {
  res.render('404', {
    error: '!404 not found',
    name: 'Robot Man'
  });
});

// app.com
// app.com/help
// app.com/about

// the process of starting a server is aysnc
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});