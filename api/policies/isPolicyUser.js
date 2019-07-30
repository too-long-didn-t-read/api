var jwt = require('jsonwebtoken')

module.exports = async (req, res, proceed) => {
  const token = req.headers.authorization
  if (!token) {
    return res.unauthorized(new Error('User is not authenticated'))
  }
  try {
    const decoded = jwt.verify(token.replace(/^Bearer /, ''), sails.config.session.secret)
    console.log(decoded)
  } catch(e) {
    return res.unauthorized(new Error('The provided token was corrupted'))
  }
  return proceed()
}
