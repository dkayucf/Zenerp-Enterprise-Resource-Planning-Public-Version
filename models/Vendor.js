const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const VendorSchema = new Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorEmail: {
        type: String
    },
    vendorPhone: {
        type: String
    },
    vendorAddress: {
        type: String,
        required: true
    },
    vendorCity:{
        type: String,
        required: true
    },
    vendorState: {
        type: String,
        required: true
    },
    vendorZip:{
        type: Number,
        required: true
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
mongoose.model('vendors', VendorSchema);