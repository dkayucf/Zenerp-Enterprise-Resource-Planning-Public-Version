const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    googleID: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    billingAddress: {
        type: String
    },
    billingCity:{
        type: String
    },
    billingState: {
        type: String
    },
    billingZip:{
        type: Number
    },
    password:{
        type: String
    },
    image: {
        type: String
    },
    isManager: {
        type: Boolean,
        default: false
    },
    isOwner: {
        type: Boolean,
        default: false
    },
    hourlyPay: {
        type: Number,
        default: 7.25
    },
    salaryPay: {
        type: Number
    },
    employeeDepartment:{
        type: Schema.Types.ObjectId,
        ref: 'departments'
    },
    employeeStore:{
        type: Schema.Types.ObjectId,
        ref: 'stores'
    },
    employeeBusiness:{
        type: Schema.Types.ObjectId,
        ref: 'business'
    },
    employmentStatus: {
        type: String
    },
    terminationDate: {
        type: Date
    },
    hireDate: {
        type: Date
    },
    date:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

//Create collection and add schema
mongoose.model('users', UserSchema);