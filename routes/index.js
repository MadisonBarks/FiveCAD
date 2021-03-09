// Main Imports
const Router = require('express').Router();
const Path = require('path');

// Module Imports

// Location of all the views, which in reality are just HTML pages.
// That might change later - I'm still not sure if I wanna do client-side
// or server-side rendering
const viewLocation = Path.join(__dirname, '/../views/');

// Set up of modules imported above

// Local routes
Router.get('/', (req, res) => {
  return res.render(Path.join(viewLocation, 'index.hbs'));
});

Router.get('/login', (req, res) => {
  return res.render(Path.join(viewLocation, 'login.hbs'));
});

Router.get('/dash', (req, res) => {
  return res.render('light/dashboard');
})

Router.get('/dash-dark', (req, res) => {
  return res.render('dark/dashboard');
})

Router.get('/civilian', (req, res) => {
  return res.render('dark/civilians');
});

Router.get('/newciv', (req, res) => {
  return res.render('dark/newciv');
});


module.exports = Router;
