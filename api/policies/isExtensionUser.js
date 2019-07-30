var jwt = require('jsonwebtoken')

module.exports = async (req, res, proceed) => {
  const extensionUserId = req.headers.extensionUserId
  const token = req.headers.authorization
  if (!extensionUserId || !token) {
    return res.unauthorized(new Error('Extension user is not authenticated'))
  }
  try {
    const decoded = jwt.verify(token.replace(/^Bearer /, ''), sails.config.extension.secret + extensionUserId)
    console.log(decoded)
  } catch(e) {
    return res.unauthorized(new Error('The provided token was corrupted'))
  }
  return proceed()
}
