const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const smsController = require('../controller/smsController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Shift tradee response SMS POST
router.post('/', smsController.responseSMS);



module.exports = router;