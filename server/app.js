const express = require('express');
const bodyParser = require('body-parser');
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
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session ({
      secret: "secret-key",
      resave: true,
      saveUninitialized: true,
    })
);

// //passport config
// require('./config/passport')(passport);
//
// //Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride('_method'));


//Routes
const userRouter = require('./routes/users');
app.use('/',userRouter);

app.listen(Port, ()=> {
  console.log(`App is running on ${Port}`)
})
