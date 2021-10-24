const express = require('express')
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login');
  }
}

router.get('/', (req, res) => {
  res.render('index', {layout : 'main'});
});

router.get('/login', (req, res) => {
  res.render('auth/login', {layout : 'main'});
});

router.get('/test', ensureAuthenticated, (req, res) => {
  res.render('test', {layout : 'main'});
})

// API
router.use('/api', require('./api/api'))

module.exports = router;
