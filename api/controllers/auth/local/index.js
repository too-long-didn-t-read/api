const passportServices = require('../../../lib/passport-services')
const jwt = require('jsonwebtoken')

module.exports = {
  friendlyName: 'Login',
  description: 'Authorize the user.',
  inputs: {
    email: {
      type: 'string',
      description: 'email.',
      required: true
    },
    password: {
      type: 'string',
      description: 'password.',
      required: true
    }
  },
  exits: {
    serverError: {
      responseType: 'serverError'
    },
    unauthorized: {
      responseType: 'unauthorized'
    },
    success: {
      responseType: 'ok'
    }
  },
  async fn (inputs, exits) {
    let user = null
    try {
      user = await passportServices.authenticate(this.req, this.res)
      await passportServices.login(this.req, user)
    } catch(err) {
      if (err) {
        if (err.code === 'E_BAD_CREDENTIALS') {
          return exits.unauthorized(err)
        }
        return exits.serverError(err)
      }
    }
    const token = jwt.sign(user.toJSON(), sails.config.session.secret, { expiresIn: '24h' })
    return exits.success({user: user.username, token})
  }
}
