/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    displayName: {
      type: 'string'
    },
    pic: {
      type: 'string',
      isURL: true
    },
    email: {
      type: 'string',
      unique: true,
      isEmail: true
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
    }
  }
}
