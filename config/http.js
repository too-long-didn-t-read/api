/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const passport = require('passport')

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'findOrCreateProfile',
      'passportInitialize',
      'passportSession',
      'router',
      'www',
      'favicon'
    ],

    passportInitialize: passport.initialize(),
    passportSession: passport.session(),
    async findOrCreateProfile (req, res, proceed) {
      if (req.headers.extensionUserId) {
        try {
          let profile = await Profile.findOne({extensionUserId: req.headers.extensionUserId})
          if (!profile) {
            profile = await Profile.create({extensionUserId: req.headers.extensionUserId}).fetch()
          }
          req.profile = profile
        } catch(e) {
          return proceed(e)
        }
      }
      return proceed()
    }
  }
}