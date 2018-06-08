const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//Vendors view
router.get('/', ensureAuthenticated, (req, res)=>{
    res.render('templates/templates');
});

module.exports = router;