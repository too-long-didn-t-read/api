module.exports = async (req, res, proceed) => {
  const extensionId = req.headers.extensionId
  if (!extensionId || extensionId !== sails.config.extension.id) {
    return res.unauthorized(new Error('This endpoint accepts requests from extension only!'))
  }
  return proceed()
}
