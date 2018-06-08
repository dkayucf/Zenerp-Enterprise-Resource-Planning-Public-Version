const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ShiftTradesSchema = new Schema({
    /***********SHIFT TRADER************ */
    traderID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    traderShiftID: {
        type: Schema.Types.ObjectId,
        ref: 'events'
    },
    /***********SHIFT TRADEE*********** */
    tradeeID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tradeeShiftID: {
        type: Schema.Types.ObjectId,
        ref: 'events'
    },
    tradeePhone: {
        type: String
    },
    /*********SHIFT TRADE APPROVAL********* */
    tradeeApproval: {
        type: Boolean,
        default: false
    },
    managerID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

//Create collection and add schema
mongoose.model('shiftTrades', ShiftTradesSchema);



