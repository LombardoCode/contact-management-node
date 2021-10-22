const express = require('express')
const app = express()
const morgan = require('morgan')
const exhbs = require('express-handlebars')
const path = require('path')
require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exhbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('../lib/handlebars')
}))
app.set('view engine', '.hbs')

// Database
require('./db')

// Middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global variables
app.use((req, res, next) => {
  next();
})

// Routing
app.use('/', require('../routes/index'));

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Start server
app.listen(app.get('port'), () => {
  console.log("Server running on PORT: ", app.get('port'))
})
