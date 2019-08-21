/**
 * Change.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    from: {
      type: 'json'
    },
    to: {
      type: 'json'
    },
    isCommited: {
      type: 'boolean',
      defaultsTo: false
    },
    /**
     * Association
     */
    user: {
      model: 'user',
      required: true
    },
    clause: {
      model: 'clause',
      required: false
    },
    tldr: {
      model: 'tldr',
      required: false
    },
    commitedBy: {
      model: 'user',
      required: false
    }
  }

}
