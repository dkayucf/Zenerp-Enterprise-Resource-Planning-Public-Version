const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ScheduleRequestSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //Schedule Request Type (single request:false or multiday:true)
    requestType: {
        type: Boolean,
        default: false
    },
    //Schedule Request Manager Approval (approved: true or disapproved: false)
    requestStatus: {
        type: Boolean,
        default: false
    },
    //Schedule Requests will be editable by default. Upon manager approval they will be updated to false.
    editable: {
        type: Boolean,
        default: true
    },
    //Schedule request for single date
    requestStart_Single: {
        type: Date
    },
    requestEnd_Single: {
        type: Date
    },
    //Request TIMES 
    requestTimeStart: {
        type: String
    },
    requestTimeEnd: {
        type: String
    },
    //***********Multi day schedule request**********************
    requestStartDate_multi:{
        type: Date
    },
    requestEndDate_multi: {
        type: Date
    },
    dateRepeat: {
        type: String
    },
    weeklyRequestDays: {
        type:[]
    },
    employeeComments: {
        type: String
    },
    employeeStore:{
        type: Schema.Types.ObjectId,
        ref: 'stores'
    }
    
});

//Create collection and add schema
mongoose.model('scheduleRequests', ScheduleRequestSchema);



