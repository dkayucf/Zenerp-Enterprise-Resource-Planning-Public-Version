const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const departmentController = require('../controller/departmentController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Create Department
router.post('/', ensureAuthenticated, sanitizeBody(['departmentName']).trim().escape(), departmentController.create);

//Find departments and render
router.get('/', ensureAuthenticated, departmentController.find);

//Delete Department
router.get('/delete/:id', ensureAuthenticated, departmentController.delete);

module.exports = router;