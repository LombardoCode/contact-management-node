const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../src/db');
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email
      }
    }
  });

  if (user) {
    const samePasswords = await bcrypt.compareSync(password, user.password);
    if (samePasswords) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Error2.' })
    }
  } else {
    return done(null, false, { message: 'Error1.' })
  }
}));

passport.serializeUser((user, done) => {
  console.log("passport 1")
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await User.findOne({
    where: {
      id: {
        [Op.eq]: id
      }
    }
  })
  .then(function(user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
})

