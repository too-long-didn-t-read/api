const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
  global['E'] = sails.config.errors

  const auth = (email, password) => {
    return new Promise(async (resolve, reject) => {
      let user = null
      try {
        user = await User.findOne({ email })
      } catch (e) {
        return reject(E.error(e))
      }
      if (!user) {
        return reject(E.badCredentials('bad credentials', {cause: `No user was found with the email ${email}`}))
      }
      if (!User.validate(user, password)) {
        return reject(E.badCredentials('bad credentials', {cause: `Wrong password for email ${email}`}))
      }
      return resolve(user)
    })
  }

  passport.serializeUser((user, done) => {
    done(null, _.omit(user, ['password', 'salt', 'confirmationString', 'resetPasswordToken', 'confirmationExpireOn', 'resetPasswordExpireOn']))
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    let user = null
    try {
      user = await auth(email, password)
    } catch(err) {
      return done(err, null)
    }
    return done(null, user)
  }))
  return done()
}
