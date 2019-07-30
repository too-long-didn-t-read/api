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
      unique: true,
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
    profiles: {
      collection: 'profile',
      via: 'user'
    },
    votes: {
      collection: 'vote',
      via: 'user'
    },
    votedSimplified: {
      collection: 'simplified',
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
    changesOnSimplified: {
      collection: 'simplified',
      via: 'user',
      through: 'change'
    },
    changesOnTldr: {
      collection: 'tldr',
      via: 'user',
      through: 'change'
    }
  }
}
