const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const vendorController = require('../controller/vendorController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Get individual vendor to edit
router.get('/:id', ensureAuthenticated, vendorController.getIndividualVendor);

//Send individual vendor JSON
router.get('/data/:id', ensureAuthenticated, vendorController.sendVendorJSON);

//Vendors view
router.get('/', ensureAuthenticated, vendorController.find);

//Process Add Vendors
router.post('/', ensureAuthenticated, sanitizeBody(['vendorName','vendorEmail', 'vendorPhone', 'vendorAddress', 'vendorCity', 'vendorState', 'vendorZip']).trim().escape(), vendorController.create);

//Update Vendor
router.put('/update/:id', ensureAuthenticated, sanitizeBody(['vendorName','vendorEmail', 'vendorPhone', 'vendorAddress', 'vendorCity', 'vendorState', 'vendorZip']).trim().escape(), vendorController.vendorUpdate);

//Delete Vendor
router.get('/delete/:id', ensureAuthenticated, vendorController.deleteVendor);

module.exports = router;