
const http = require('http');
const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');



//Load Models
require('./models/User');
require('./models/Vendor');
require('./models/Business');
require('./models/Invoice');
require('./models/Stores');
require('./models/Departments');
require('./models/ScheduleRequests');
require('./models/Events');
require('./models/ScheduleSettings');
require('./models/ShiftTrades');

//Passport Config
require('./config/passport')(passport);


/**********************ROUTES***********************/
//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const vendors = require('./routes/vendors');
const invoices = require('./routes/invoices');
const templates = require('./routes/templates');
const reports = require('./routes/reports');
const account = require('./routes/account');
const stores = require('./routes/stores');
const inventory = require('./routes/inventory');
const employees = require('./routes/employees');
const schedules = require('./routes/schedules');
const departments = require('./routes/departments');
const sms = require('./routes/sms');

//Handlebars Helpers
const {
    truncate,
    formatDate,
    updateInvoiceStatus,
    stripTags,
    ifCond,
    select
} = require('./helpers/hbs');

//Mongoose connect
mongoose.connect(process.env.MONGOURI)
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();


/*********************MIDDLEWARE********************/
app.use(morgan('dev'));

//Handlebars Middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        formatDate: formatDate,
        updateInvoiceStatus: updateInvoiceStatus,
        stripTags: stripTags,
        ifCond: ifCond,
        select: select
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Method Override middleware
app.use(methodOverride('_method'));

//static folder
app.use(express.static(__dirname + '/public'));

//FIXME: https://www.youtube.com/watch?v=hE5zeEiVqpw  @@5:07/16:43
//express session by default uses memory storage which is not good for production
//consider other compatible session stores
//http://github.com/expressjs/session#compatible-session-stores
app.use(expressValidator());

app.use(cookieParser());
//TODO: Set up session secret in environmental variable
//TODO: Modify during production to set the session storage for express-session to be through mongodb
//Express-Session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Set Global vars
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/vendors', vendors);
app.use('/invoices', invoices);
app.use('/templates', templates);
app.use('/reports', reports);
app.use('/account', account);
app.use('/stores', stores);
app.use('/inventory', inventory);
app.use('/employees', employees);
app.use('/schedules', schedules);
app.use('/departments', departments);
app.use('/sms', sms);


app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});