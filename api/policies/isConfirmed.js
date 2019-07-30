module.exports = async (req, res, proceed) => {
  if (!req.user || !req.user.isConfirmed) {
    return res.unauthorized(new Error('User did not confirm his email!'))
  }
  return proceed()
}
