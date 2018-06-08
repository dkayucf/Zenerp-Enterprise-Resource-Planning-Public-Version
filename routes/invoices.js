const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');
const Business = mongoose.model('business');
const User = mongoose.model('users');
const Vendor = mongoose.model('vendors');
const Invoice = mongoose.model('invoices');
const invoiceController = require('../controller/invoiceController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


router.use(express.static('../public'));

//Invoices view
router.get('/', ensureAuthenticated, invoiceController.getInvoiceView);


//Invoices Add
router.get('/add', ensureAuthenticated, invoiceController.invoiceAddView);

//Process Add New Invoices
router.post('/add', sanitizeBody(['salesPerson','invoiceId', 'issueDate', 'dueDate', 'subject', 'invoiceItems', 'vendorTo', 'comments', 'terms', 'subtotal', 'taxRate', 'taxAmount', 'payments', 'amountDue', 'status', 'user']).trim().escape(), ensureAuthenticated, invoiceController.createNewInvoice);

//Invoice Edit
router.get('/edit/:id', ensureAuthenticated, invoiceController.editInvoice);

//Invoice Item Edit
router.get('/data/:id', ensureAuthenticated, invoiceController.invoiceItemsEdit);

module.exports = router;