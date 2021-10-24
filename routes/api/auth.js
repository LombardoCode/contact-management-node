const express = require('express')
const router = express.Router();
const { User } = require('../../src/db');
const passport = require('passport')
const bcrypt = require('bcryptjs')

// User registration
router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  return res.json(user);
})

// User login
router.post('/login', async (req, res, next) => {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })(req, res, next);
})

module.exports = router;
