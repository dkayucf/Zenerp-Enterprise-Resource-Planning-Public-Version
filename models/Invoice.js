const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const InvoiceSchema = new Schema({
    invoiceId: {
        type: Number,
        required: true
    },
    salesPerson: {
        type: String
    },
    issueDate: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Number,
        required: true
    },
    subject: {
        type: String
    },
    businessFrom: {
        type: Schema.Types.ObjectId,
        ref: 'business'
    },
    vendorTo: {
        type: Schema.Types.ObjectId,
        ref: 'vendors'
    },
    invoiceItems: [{}],
    comments: {
        type: String,
    },
    terms: {
        type: String,
    },
    subtotal:{
        type: Number,
        required: true
    },
    taxRate:{
        type: Number,
        required: true
    },
    taxAmount:{
        type: Number,
        required: true
    },
    payments:{
        type: Number
    },
    amountDue:{
        type: Number,
        required: true
    },
    status:{
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
mongoose.model('invoices', InvoiceSchema);