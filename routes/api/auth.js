const express = require('express')
const router = express.Router();
const { User } = require('../../src/db');
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');

// User registration
router.post('/register',
    check('name')
      .notEmpty().withMessage('El campo de nombre es requerido'),
    check('email')
      .notEmpty().withMessage('El campo de email es requerido')
      .isEmail().withMessage('El formato del email no es válido'),
    check('password')
      .notEmpty().withMessage('El campo de contraseña es requerido')
      .isLength({min: 4}).withMessage('El campo de contraseña debe de tener al menos 4 caracteres')
      .custom((value, {req}) => {
        return value === req.body.password2;
      }).withMessage('Las contraseñas no coinciden.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    return res.json(user);
})

// User login
router.post('/login', async (req, res, next) => {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
