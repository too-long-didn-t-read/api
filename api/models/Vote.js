/**
 * Vote.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    votedOk: {
      type: 'boolean',
      defaultsTo: false
    },
    /**
     * Associations
     */
    user: {
      model: 'user',
      required: true
    },
    clause: {
      model: 'clause',
      required: true
    }
  }
}
