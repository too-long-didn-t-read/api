module.exports = function created (data) {
  const res = this.res
  let status = 201

  if (_.isUndefined(data)) {
    sails.log.debug('Empty created response sent')
    return res.sendStatus(status)
  }

  if (_.isError(data)) {
    sails.log.warn('Created response called, with an error')
    sails.log.warn('Mutating Created response to serverError response')
    status = 500
    sails.log.error('ServerError response called, with an error', data)
    let err = {error: data.code || 'E_UNKNOWN', name: data.name, message: data.message}
    if (process.env.NODE_ENV !== 'production') {
      err.stack = data.stack
      err.details = data.raw || {}
    }
    sails.log.debug('more', _.omit(err, ['stack']))
    res.status(status)
    return res.json(err)
  }
  res.status(status)
  return res.json(data)
}
