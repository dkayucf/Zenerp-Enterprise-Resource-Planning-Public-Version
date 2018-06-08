const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BusinessSchema = new Schema({
    businessImage: {
        type: String
    },
    businessName: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String
    },
    businessPhone: {
        type: String
    },
    businessAddress: {
        type: String,
        required: true
    },
    businessCity:{
        type: String,
        required: true
    },
    businessState: {
        type: String,
        required: true
    },
    businessZip:{
        type: Number,
        required: true
    },
    businessTaxRate:{
        type: Number
    },
    businessTerms:{
        type: String    
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

//Create collection and add schema
mongoose.model('business', BusinessSchema);