/**
 * Clause.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    isCommon: {
      type: 'boolean',
      defaultsTo: false
    },
    severity: {
      type: 'number',
      isIn: [0, 1, 2, 3, 4, 5],
      defaultsTo: 0
    },
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    chunks: {
      type: 'json'
    },
    votedOk: {
      type: 'number',
      defaultsTo: 0
    },
    votedDiscard: {
      type: 'number',
      defaultsTo: 0
    },
    /**
     * Associations
     */
    tldr: {
      model: 'tldr',
      required: true
    },
    votes: {
      collection: 'vote',
      via: 'clause'
    },
    votedBy: {
      collection: 'user',
      via: 'clause',
      through: 'vote'
    },
    changes: {
      collection: 'change',
      via: 'clause'
    },
    changesSuggestedBy: {
      collection: 'user',
      via: 'clause',
      through: 'change'
    }
  }
}
