const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//Vendors view
router.get('/', ensureAuthenticated, (req, res)=>{
    res.render('reports/reports');
});

module.exports = router;