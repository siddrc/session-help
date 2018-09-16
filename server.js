const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/DB');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    cookie: { secure: false, expires: new Date(Date.now() + (90 * 86400 * 1000)) },
    resave: true,
    saveUninitialized: true
}));
mongoose.Promise = global.Promise;
const signUpRoutes = require('./routes/signup.route');
const logInRoutes = require('./routes/login.route');
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;
app.use('/signup', signUpRoutes);
app.use('/login', logInRoutes);
const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});