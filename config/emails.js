module.exports.emails = {
  mailgun: {
    port: 25,
    host: 'smtp.mailgun.org',
    secure: false,
    auth: {
      user: 'postmaster@sandboxebd5449487e8446cb73a156d0d212630.mailgun.org',
      pass: '68a57c08690509e53a1864a5c54a31f3'
    }
  },
  sendmail: {
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000
  },
  smtp: {
    port: 587, // The port to connect to
    host: 'in-v3.mailjet.com', // The hostname to connect to
    secure: false, // Defines if the connection should use SSL
    auth: {
      user: '6861685204928d1d6ed1f1a851b12950',
      pass: '408f6d593100aa15e5ef991e5dad2d2a'
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000
  }
}
