const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv/config');
require('./../app');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const authController = require('../controller/authController');

//Load user model
require('../models/User');
const User = mongoose.model('users');

/************************GOOGLE AUTH ROUTES*************************/
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//Google Callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }), (req, res) => {
        res.redirect('/dashboard');
    });


router.get('/verify', (req, res) => {
    if (req.user) {
        console.log(req.user);
    } else {
        console.log('Not Auth');
    }
});


/***********************LOCAL AUTH ROUTES*******************************/
//User Login Route
router.get('/login', authController.getLoginView);

//User registration Route
router.get('/register', authController.getRegisterView);

//Login form post
router.post('/login', sanitizeBody(['email']).trim().escape(), authController.loginFormPost);

//User Logout
router.get('/logout', authController.userLogout);

//Register Form Post
router.post('/register', sanitizeBody(['firstName','lastName', 'email', 'billingAddress', 'billingCity', 'billingState', 'billingZip', 'phone', 'full_phone']).trim().escape(), authController.registerFormPost);

/*-----------------------PASSWORD RESET ROUTES------------------------*/
//User forgot Password
router.get('/forgot', authController.getForgotPassView);

//Fogot password post
router.post('/forgot', sanitizeBody(['email']).trim().escape(), authController.forgotPassPost);

//Get Reset Pass view
router.get('/reset/:token', authController.getResetPassView);

//Reset Password Post
router.post('/reset/:token', authController.resetPassPost);




module.exports = router;
