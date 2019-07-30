/**
 * Tldr.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const crypto = require('crypto')
const request = require('../lib/request')
const cheerio = require('cheerio')

module.exports = {
  attributes: {
    url: {
      type: 'string',
      required: true,
      isURL: true
    },
    type: {
      type: 'string',
      isIn: ['policy & privacy', 'terms of use'],
      defaultsTo: 'policy & privacy'
    },
    cssPath: {
      type: 'string',
      required: true
    },
    domain: {
      type: 'string',
      // required: true,
      isURL: true
    },
    uniqueName: {
      type: 'string',
      // required: true,
      isURL: true
      // unique: true
    },
    text: {
      type: 'string'
      // required: true
    },
    checksum: {
      type: 'string'
      // required: true
    },
    /**
     * Associations
     */
    simplifieds: {
      collection: 'simplified',
      via: 'tldr'
    },
    changes: {
      collection: 'change',
      via: 'tldr'
    },
    changesSuggestedBy: {
      collection: 'user',
      via: 'tldr',
      through: 'change'
    }
  },
  async beforeCreate (tldr, next) {
    try {
      tldr.domain = new URL(tldr.url).hostname
      console.log(new URL(tldr.url))
      const html = await request(new URL(tldr.url))
      const $ = cheerio.load(html)
      tldr.text = $(tldr.cssPath).text()
      tldr.checksum = crypto
        .createHash('sha256')
        .update(tldr.text, 'utf8')
        .digest('hex')
    } catch (e) {
      return next(e)
    }
    tldr.uniqueName = `${tldr.type === 'policy & privacy' ? 'privacy' : 'terms'}://${tldr.domain}`
    return next()
  }
}
