const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const schedulesController = require('../controller/schedulesController');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Display Schedule by User ID
router.get('/build', ensureAuthenticated, schedulesController.displayScheduleView);

//Get schedule data based on storeID
router.get('/build/store/:id', ensureAuthenticated, schedulesController.retrieveScheduleJSON);


//Display schedule (OWNER VIEW!)
router.get('/owner/view', ensureAuthenticated, schedulesController.displayOwnerSchedule);

//TODO: Finish Validation
//Schedule Settings
router.post('/settings', ensureAuthenticated, sanitizeBody(['slotDuration','firstDay', 'minTime', 'maxTime']).trim().escape(), schedulesController.saveScheduleSettings);

//Employee Hours Card- JSON Response
router.get('/hours', ensureAuthenticated, schedulesController.employeeScheduledHours);

/*
**CALENDAR CRUD ROUTES**
*/
//Shift post request (add shift)
router.post('/build/shift/add', ensureAuthenticated, schedulesController.addShiftEvent);

//Shift put request (update shift)
router.put('/build/shift/update', ensureAuthenticated, schedulesController.updateShiftEvent);

//Shift Delete request
router.delete('/build/shift/delete', ensureAuthenticated, schedulesController.deleteShiftEvent);

//Get All events by store
router.get('/build/load/:id', ensureAuthenticated, schedulesController.getAllShifts);

//Publish Schedule
router.put('/build/published',  ensureAuthenticated, sanitizeBody(['managerComments']).trim().escape(), schedulesController.publishSchedule);

/*
*SHEDULE REQUEST ROUTES**
//TODO: Finish Implementing the schedule request (email manager schedule requests and implement the disapprove button)
*/
//Schedule Requests
router.get('/requests', ensureAuthenticated, schedulesController.scheduleRequestView);

//Employee Schedule Requests
router.post('/requests', ensureAuthenticated,  sanitizeBody(['requestDate','requestStart', 'requestEnd', 'employeeComments', 'requestDateStart', 'requestDateEnd']).trim().escape(), schedulesController.createScheduleRequest);

//Schedule request Approval
router.get('/request/approve', ensureAuthenticated, schedulesController.approveRequest);

//Employee Schedule Requests
router.get('/request/delete',  ensureAuthenticated, schedulesController.deleteScheduleRequest);

/*
*SHIFT TRADE**
*/
//Get shift trade view
router.get('/tradeShift', ensureAuthenticated, schedulesController.getShiftTradeView);

//Get tradee shift data
router.get('/tradeShift/data', ensureAuthenticated, schedulesController.getTradeeShifts);

//TODO: Finish Validation
//Shift Trade Post
router.post('/tradeShift', ensureAuthenticated,  sanitizeBody(['traderName','traderStart', 'traderEnd', 'tradeeName', 'tradeeShift', 'tradeComments']).trim().escape(), schedulesController.createShfitTrade);


module.exports = router;