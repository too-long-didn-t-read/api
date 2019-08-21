/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'post /auth/register': 'user.register',
  'post /auth/login': 'auth.local.index',
  'get /auth/logout': 'auth.logout',
  'post /vote': 'vote.vote'
}
