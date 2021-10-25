const express = require('express')
const router = express.Router();

// Auth middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login');
  }
}

// Protected routes
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', {layout : 'main'});
});
router.use('/contact', ensureAuthenticated, require('./contact'));

// Public routes
router.get('/login', (req, res) => {
  res.render('login', {layout : 'main'});
});

router.get('/register', (req, res) => {
  res.render('register', {layout: 'main'});
})

router.get('/test', ensureAuthenticated, (req, res) => {
  res.render('test', {layout : 'main'});
})

// API
router.use('/api', require('./api/api'))

module.exports = router;
