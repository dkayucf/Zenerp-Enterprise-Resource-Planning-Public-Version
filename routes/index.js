const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');
const Business = mongoose.model('business');
const User = mongoose.model('users');
const Invoice = mongoose.model('invoices');
const invoiceFunctions = require('../controller/invoice');


//Main Route
router.get('/', ensureGuest, (req, res)=>{
   res.render('index/welcome'); 
});



router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    Business.find({user:req.user.id})
        .then(business => {

            if(business.length === 0 && req.user.isOwner){
                res.render('account/businessProfile', {
                    business: business[0]
                });    
            } else {
                Invoice.find({user:req.user.id}).populate('user').populate('vendorTo').then(invoice =>{
                        let invoiceStatus = invoiceFunctions.countInvoiceByStatus(invoice);
    
                    res.render('index/dashboard', {
                        invoicesPaid: invoiceStatus.invoicesPaid,
                        paidCount: invoiceStatus.paidCount,
                        invoicesDue: invoiceStatus.invoicesDue,
                        dueCount: invoiceStatus.dueCount,
                        invoicesPastDue: invoiceStatus.invoicesPastDue,
                        pastDueCount: invoiceStatus.pastDueCount
                    });
                });
            }

   });
   
});

module.exports = router;