module.exports = function resOk (data) {
  const req = this.req
  const res = this.res
  let status = 200
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // If `res.ok()` is being called by the blueprint "create" action,
  // then use 201 instead.
  var isBlueprintAction = !!req.options.model
  if (isBlueprintAction) {
    var bpActionName = _.last(req.options.action.split('/'))
    if (bpActionName === 'create') {
      sails.log.debug('Mutating OK response to Created response')
      status = 201
    }
  }
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  if (_.isUndefined(data)) {
    sails.log.verbose('Empty OK response sent')
    return res.sendStatus(status)
  }

  if (_.isError(data)) {
    sails.log.warn('OK response called, with an error')
    sails.log.warn('Mutating OK response to serverError response')
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
