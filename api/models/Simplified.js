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
      isIn: [0, 1, 2, 3, 4, 5]
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
    tldr: {
      model: 'tldr'
    }
  }
}
