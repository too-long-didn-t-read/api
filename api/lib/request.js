const https = require('https')
const http = require('http')

module.exports = request = function (options, data) {
  return new Promise((resolve, reject) => {
    if (options.method && ['POST', 'PUT', 'PATCH'].indexOf(options.method.toUpperCase()) !== -1) {
      options.headers['Content-Length'] = Buffer.byteLength(data)
    }

    let httpRequest = http.request
    if (options.protocol === 'https:') {
      httpRequest = https.request
    }
    req = httpRequest(options, (res) => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        return resolve(body)
      })
    })
    req.on('error', (err) => {
      return reject(err)
    })
    if (options.method && ['POST', 'PUT', 'PATCH'].indexOf(options.method.toUpperCase()) !== -1) {
      req.write(data)
    }
    req.end()
  })
}
