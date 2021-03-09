// Main Imports
const Router = require('express').Router();
const Path = require('path');

// Module Imports

// Local routes
Router.get('/new/arrest', (req, res) => {
    return res.render('dark/reports/arrest');
})

Router.get('/new/misc', (req, res) => {
    return res.render('dark/reports/misc');
})


module.exports = Router;