const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const EventsSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    department: {
        type: String
    },
    url: {
        type: String
    },
    className:{
        type: String
    },
    resourceId: {
        type: String
    },
    editable: {
        type: Boolean
    },
    overlap: {
        type: Boolean,
        default: false
    },
    color:{
        type: String
    },
    shiftStatus: {
        type: Boolean,
        defaultValue: false
    },
    employeeStore:{
        type: Schema.Types.ObjectId,
        ref: 'stores'
    },
    managerComments: {
        type: String
    }
    
});

//Create collection and add schema
mongoose.model('events', EventsSchema);



