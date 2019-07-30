/**
 * Simplified.js
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
      via: 'simplified'
    },
    votedBy: {
      collection: 'user',
      via: 'simplified',
      through: 'vote'
    },
    changes: {
      collection: 'change',
      via: 'simplified'
    },
    changesSuggestedBy: {
      collection: 'user',
      via: 'simplified',
      through: 'change'
    }
  }
}
