/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const crypto = require('crypto')

module.exports = {
  attributes: {
    username: {
      type: 'string',
      // unique: true,
      // sails disc only
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      isEmail: true,
      // sails disc only
      required: true
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 128
    },
    salt: {
      type: 'string'
    },
    confirmationString: {
      type: 'string'
    },
    confirmationExpireOn: {
      type: 'number',
      defaultsTo: 0
    },
    isConfirmed: {
      type: 'boolean',
      defaultsTo: false
    },
    resetPasswordToken: {
      type: 'string'
    },
    resetPasswordExpireOn: {
      type: 'number',
      defaultsTo: 0
    },
    /**
     * Associations
     */
    votes: {
      collection: 'vote',
      via: 'user'
    },
    votedclause: {
      collection: 'clause',
      via: 'user',
      through: 'vote'
    },
    changes: {
      collection: 'change',
      via: 'user'
    },
    commitedChanges: {
      collection: 'change',
      via: 'commitedBy'
    },
    changesOnclause: {
      collection: 'clause',
      via: 'user',
      through: 'change'
    },
    changesOnTldr: {
      collection: 'tldr',
      via: 'user',
      through: 'change'
    }
  },
  async beforeCreate(user, next) {
    try {
      user.confirmationString = crypto.randomBytes(18).toString('base64')
    } catch (e) {
      return next(e)
    }
    user.confirmationExpireOn = new Date().valueOf() + (sails.config.custom.verificationGrace || 86400000)
    return next()
  },
  customToJSON() {
    return _.omit(this, ['password', 'salt', 'confirmationString', 'resetPasswordToken', 'resetPasswordExpireOn', 'confirmationExpireOn'])
  },
  protect(user) {
    if (user.password) {
      let md5 = crypto.createHash('md5')
      md5.update(new Date().toString() + (Math.round(Math.random() * 200000000) - 100000000))
      user.salt = md5.digest('hex')
      let hmac = crypto.createHmac('sha512', user.salt)
      hmac.update(user.password)
      user.password = hmac.digest('hex')
      return user
    }
    throw E.noPassword(user)
  },
  validate(user, password) {
    let hmac = crypto.createHmac('sha512', user.salt)
    hmac.update(password)
    return user.password === hmac.digest('hex')
  },
  async sendConfirmationMail(user) {
    try {
      await sails.helpers.sendMail(
        user.email,
        'Confirm your account',
        'confirm',
        {
          username: user.username,
          confirmationString: user.confirmationString,
          confirmationExpireOn: user.confirmationExpireOn
        }
      ).tolerate('errorSending', (err) => {
        sails.log.warn(err)
      })
      return user
    } catch (e) {
      throw e
    }
  }
}
