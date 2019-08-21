var jwt = require('jsonwebtoken')

module.exports = async (req, res, proceed) => {
  const token = req.headers.authorization
  if (!token) {
    return res.unauthorized(E.noJWT())
  }
  try {
    const decoded = jwt.verify(token.replace(/^Bearer /, ''), sails.config.session.secret)
    const user = await User.findOne({id: decoded.id})
    req.user = user.toJSON()
  } catch (e) {
    return res.unauthorized(E.failedJWT(e))
  }
  return proceed()
}
