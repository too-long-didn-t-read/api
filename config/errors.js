const flaverr = require('flaverr')

module.exports.errors = {
  error(err, raw = {}) {
    raw.date = new Date().toUTCString()
    return flaverr({
      name: 'GenericError',
      code: 'E_EXCEPTION',
      message: err.message,
      raw
    }, err)
  },
  usage(code = 'E_USAGE', message = '', raw = {}) {
    return flaverr({
      name: 'UsageError',
      code,
      message,
      raw
    }, new Error(message))
  },
  noAuth(message = 'This action require authentication', raw = {}) {
    raw.date = new Date().toUTCString()
    return flaverr({
      name: 'NoAuth',
      code: 'E_NO_AUTH',
      message,
      raw
    }, new Error(message))
  },
  notFound(message = 'not found', raw = {}) {
    raw.date = new Date().toUTCString()
    return flaverr({
      name: 'NotFound',
      code: 'E_NOT_FOUND',
      message,
      raw
    }, new Error(message))
  },
  badCredentials(message = 'bad credentials', raw = {}) {
    raw.date = new Date().toUTCString()
    return flaverr({
      name: 'BadCredentials',
      code: 'E_BAD_CREDENTIALS',
      message,
      raw
    }, new Error(message))
  },
  login(err, user) {
    return flaverr({
      name: 'LoginError',
      code: 'E_LOGIN',
      message: err.message,
      raw: {
        date: new Date().toUTCString(),
        email: user.email
      }
    }, err)
  },
  noPassword(user) {
    return flaverr({
      name: 'UserNoPassword',
      code: 'E_USER_NO_PASSWORD',
      message: 'Trying to create a user without a password',
      raw: {
        date: new Date().toUTCString(),
        email: user.email
      }
    }, new Error('Trying to create a user without a password'))
  },
  noJWT() {
    return flaverr({
      name: 'NoJWT',
      code: 'E_NO_JWT',
      message: 'This action require Json Web Token that was not provided',
      raw: {
        date: new Date().toUTCString()
      }
    }, new Error('This action require Json Web Token that was not provided'))
  },
  failedJWT(err) {
    return flaverr({
      name: 'FailedJWT',
      code: 'E_FAILED_JWT',
      message: 'Json Web Token provided is either expired or corrupt',
      raw: {
        date: new Date().toUTCString()
      }
    }, err)
  }
}
