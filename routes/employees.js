const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const employeeController = require('../controller/employeeController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//View all employees routes
router.get('/view', ensureAuthenticated, employeeController.viewAllEmployees);

//View all employees routes (OWNER VIEW)
router.get('/view/:id', ensureAuthenticated, employeeController.ownerViewEmployees);

//Add employees route
router.get('/add', ensureAuthenticated, employeeController.addEmployeeView);

//display department data based on store select
//DATA ROUTE - LEAVE OUT ENSURE AUTHENTICATED
router.get('/data/:id', employeeController.fetchDepartmentData);

//Display Employee profile to be edited
router.get('/edit', ensureAuthenticated, employeeController.editEmployeeProfile);

//API -JSON response - Employee profile data to update selectboxes and checkboxes
router.get('/edit/profile', employeeController.getEmpJSONData);

//Update Employee Profile
router.put('/update/:id', ensureAuthenticated, sanitizeBody(['firstName','lastName', 'email', 'phone', 'storeName', 'salaryPay', 'hireDate', 'hourlyPay']).trim().escape(), employeeController.updateEmployeeProfile);

//Messageboard routes
router.get('/messageboard', ensureAuthenticated, employeeController.employeeMsgBoard);

//Employee Add profile post
router.post('/add', ensureAuthenticated,  sanitizeBody(['firstName','lastName', 'email', 'phone', 'salaryPay', 'hireDate', 'hourlyPay']).trim().escape(), employeeController.createEmployee);




module.exports = router;