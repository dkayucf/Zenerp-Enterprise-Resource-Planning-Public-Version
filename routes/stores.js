const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const storeController = require('../controller/storeController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//View Stores Route
router.get('/', ensureAuthenticated, storeController.find);

//Store Location edit
router.get('/:id', ensureAuthenticated, storeController.editLocation);

// Add Store Location
router.post('/', ensureAuthenticated, sanitizeBody(['storeName','storeNumber', 'storeEmail', 'storePhone', 'storeAddress', 'storeCity', 'storeState', 'storeZip', 'storeSalesTax']).trim().escape(), storeController.createLocation);

//Delete Store Location
router.get('/delete/:id', ensureAuthenticated, storeController.deleteLocation);

//Update Store Location
router.put('/update/:id', ensureAuthenticated, sanitizeBody(['storeName','storeNumber', 'storeEmail', 'storePhone', 'storeAddress', 'storeCity', 'storeState', 'storeZip', 'storeSalesTax']).trim().escape(), storeController.locationUpdate);


module.exports = router;