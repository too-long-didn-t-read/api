const passport = require('passport')

module.exports = {
  authenticate: (req, res) => {
    return new Promise((resolve, reject) => {
      return passport.authenticate('local', (err, user) => {
        if (err) {
          return reject(err)
        }
        return resolve(user)
      })(req, res)
    })
  },
  login: (req, user) => {
    return new Promise((resolve, reject) => {
      return req.logIn(user, (err) => {
        if (err) {
          return reject(E.login(err, user))
        }
        return resolve()
      })
    })
  }
}
