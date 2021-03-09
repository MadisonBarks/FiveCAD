// Main Imports
const Router = require('express').Router();
const Path = require('path');

// Module Imports

// Local routes
Router.get('/', (req, res) => {
    return res.render('dark/citations');
});

Router.get('/new', (req, res) => {
    return res.render('dark/newcitation');
})


module.exports = Router;