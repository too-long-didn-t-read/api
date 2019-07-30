module.exports = function serverError (data) {
  const res = this.res
  const status = 500

  if (_.isUndefined(data)) {
    sails.log.debug('Empty serverError response sent')
    return res.sendStatus(status)
  }

  res.status(status)
  if (_.isError(data)) {
    sails.log.error('ServerError response called, with an error', data)
    let err = {error: data.code || 'E_UNKNOWN', name: data.name, message: data.message}
    if (process.env.NODE_ENV !== 'production') {
      err.stack = data.stack
      err.details = data.raw || {}
    }
    sails.log.debug('more', _.omit(err, ['stack']))
    return res.json(err)
  }
  return res.json(Object.assign({message: data.message}, data))
}
