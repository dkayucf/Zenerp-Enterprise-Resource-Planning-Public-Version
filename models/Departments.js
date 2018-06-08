const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const DepartmentsSchema = new Schema({
    departmentName: {
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

//Create collection and add schema
mongoose.model('departments', DepartmentsSchema);