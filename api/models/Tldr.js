/**
 * Tldr.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    domain: {
      type: 'string',
      required: true,
      isURL: true
    },
    homepgae: {
      type: 'string',
      isURL: true
    },
    type: {
      type: 'string',
      isIn: ['policy & privacy', 'terms of use'],
      defaultsTo: 'policy & privacy'
    },
    url: {
      type: 'string',
      required: true,
      isURL: true
    },
    text: {
      type: 'string',
      required: true
    },
    checksum: {
      type: 'string',
      required: true
    },
    simplifieds: {
      collection: 'simplified',
      via: 'tldr'
    }
  }
}
