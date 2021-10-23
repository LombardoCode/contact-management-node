const router = require('express').Router();

// Import routes
const apiAuth = require('./auth')
const apiContactRouter = require('./contact')

// Routes
router.use('/auth', apiAuth)
router.use('/contact', apiContactRouter)

module.exports = router;
