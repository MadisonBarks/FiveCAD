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
    return res.render('dark/civilians');
});

Router.get('/new', (req, res) => {
    return res.render('dark/newciv');
});

Router.get('/:id/licenses', (req, res) => {
    return res.render('dark/civlicenses');
})


module.exports = Router;