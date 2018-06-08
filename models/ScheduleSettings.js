const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const scheduleSettingsSchema = new Schema({
    slotDuration: {
        type: String
    },
    firstDay: {
        type: String
    },
    minTime: {
        type: String
    },
    maxTime: {
        type: String
    },
    employeeStore:{
        type: Schema.Types.ObjectId,
        ref: 'stores'
    }
});

//Create collection and add schema
mongoose.model('scheduleSettings', scheduleSettingsSchema);