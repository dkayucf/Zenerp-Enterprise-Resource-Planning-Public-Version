const express = require('express');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const multer = require('multer');
const cloudinary = require('cloudinary');
const accountController = require('../controller/accountController');
require('dotenv/config');
require('./../app');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');



const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})

cloudinary.config({ 
  cloud_name: 'dnbo7suir', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//Account view
router.get('/', ensureAuthenticated, accountController.findAccount);

//Business view
router.get('/business-profile/', ensureAuthenticated, accountController.findBusinessProfile);

//Process Add Business
router.post('/business-profile', ensureAuthenticated, sanitizeBody(['businessName','businessEmail', 'businessPhone', 'businessAddress', 'businessCity', 'businessState', 'businessZip', 'businessTaxRate', 'businessTerms']).trim().escape(), upload.single('businessImage'), accountController.postBusinessProfile);

//Update Business Profile
router.put('/business-profile/:id',  ensureAuthenticated, sanitizeBody(['businessName','businessEmail', 'businessPhone', 'businessAddress', 'businessCity', 'businessState', 'businessZip', 'businessTaxRate', 'businessTerms']).trim().escape(), upload.single('businessImage'), accountController.updateBusinessProfile);


module.exports = router;