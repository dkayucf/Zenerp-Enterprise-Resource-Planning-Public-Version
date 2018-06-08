const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');

//View Inventory
router.get('/view', ensureAuthenticated, (req, res)=>{
    res.render('inventory/viewInventory');
});

//Count Inventory
router.get('/count', ensureAuthenticated, (req, res)=>{
    res.render('inventory/countInventory');
});


//Order Guides
router.get('/orderGuides', ensureAuthenticated, (req, res)=>{
    res.render('inventory/orderGuides');
});

module.exports = router;