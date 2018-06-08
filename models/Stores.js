const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const StoresSchema = new Schema({
    storeNumber: {
        type: Number,
        required: true
    },
    storeName: {
        type: String
    },
    storeEmail: {
        type: String
    },
    storePhone: {
        type: String
    },
    storeAddress: {
        type: String,
        required: true
    },
    storeCity:{
        type: String,
        required: true
    },
    storeState: {
        type: String,
        required: true
    },
    storeZip:{
        type: Number,
        required: true
    },
    storeSalesTax:{
        type: Number
    },
    departments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'departments'
        }
    ],
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
mongoose.model('stores', StoresSchema);