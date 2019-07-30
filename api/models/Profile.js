/**
 * Profile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    extensionUserId: {
      type: 'string',
      unique: true,
      // sails disc only
      required: true
    },
    displayName: {
      type: 'string'
    },
    pic: {
      type: 'string',
      isURL: true
    },
    /**
     * Assocaitions
     */
    user: {
      model: 'user'
    }
  }
}
