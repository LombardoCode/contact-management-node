const express = require('express');
const app = express();
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000);

// Handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', exhbs({
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('../lib/handlebars')
}));
app.use(express.static('public'));

/*
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exhbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('../lib/handlebars')
}))
app.set('view engine', '.hbs')
*/

// Database
require('./db');

// Middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('../config/passport');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

// Routing
app.use('/', require('../routes/index'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), () => {
  console.log("Server running on PORT: ", app.get('port'));
})
