const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const dbconfig = require('./config/database')
const Port = process.env.PORT || 8080;

//init app
const app = express();

//Mongoose Connect
mongoose.connect(process.env.ATLAS_URI||dbconfig.url);

//Load Static
app.use(express.static(path.join(__dirname,'public')));

//Middleware
require("dotenv").config({path:"./config/config.env"});
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
    }
));
app.use(express.json());
// app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'mysecret',
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 360000,
        secure: false
    }
}));

//passport config
require('./config/passport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


//Routes
const userRouter = require('./routes/users');
app.use('/',userRouter);

const appointmentRouter = require('./routes/appointment');
app.use('/appointment',appointmentRouter);

const doctorRouter = require('./routes/doctors');
app.use('/doctor',doctorRouter);

const inventoryRouter = require('./routes/inventory');
app.use('/inventory',inventoryRouter);

const nurseRouter = require('./routes/nurses');
app.use('/nurse',nurseRouter);

const patientRouter = require('./routes/patients');
app.use('/patient',patientRouter);

app.listen(Port, ()=> {
  console.log(`App is running on ${Port}`)
})
