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
  const auth = (extensionUserId, password) => {
    return new Promise(async (resolve, reject) => {
      let user = null
      let profile = null
      let role = {policy: false}
      try {
        profile = await Profile.findOne({extensionUserId})
        user = await User.findOne({id: profile.user})
      } catch (e) {
        return reject(e)
      }
      if (!user) {
        return reject(new Error('bad credentials'))
      }
      if (password) {
        if (!User.validatePassword(user, password)) {
          return reject(new Error('bad credentials'))
        } else {
          role.policy = true
        }
      }
      return resolve(Object.assign({}, user, profile, role))
    })
  }

  passport.serializeUser((user, done) => {
    done(null, _.omit(user, ['password', 'salt', 'confirmationString', 'resetPasswordToken', 'confirmationExpireOn', 'resetPasswordExpireOn']))
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(new LocalStrategy({
    usernameField: 'extensionUserId',
    passwordField: 'password'
  }, async (extensionUserId, password, done) => {
    let user = null
    try {
      user = await auth(extensionUserId, password)
    } catch(err) {
      return done(err, null)
    }
    return done(null, user)
  }))
  return done()
}
