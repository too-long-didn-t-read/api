const ejs = require('ejs')
const nodemailer = require('nodemailer')
const mjml2html = require('mjml')

module.exports = {
  friendlyName: 'Sendmail',
  description: 'Sends an email.',
  inputs: {
    email: {
      description: 'email to send to',
      type: 'string',
      required: true
    },
    subject: {
      description: 'email subject to display',
      type: 'string',
      required: true
    },
    template: {
      description: 'email template to use',
      type: 'string',
      required: true
    },
    data: {
      description: 'data to be inserted into the email body',
      type: {},
      required: false
    },
    from: {
      description: 'email to send from',
      type: 'string',
      required: false
    },
    attachments: {
      description: 'files to attach',
      type: {},
      required: false
    }
  },
  exits: {
    errorGenerating: {
      description: 'Error while generating the email'
    },
    errorSending: {
      description: 'Error while sending the email'
    },
    success: {
      outputFriendlyName: 'sent',
      outputDescription: 'The email was successfully sent'
    }
  },
  fn(inputs, exits) {
    ejs.renderFile('views/email/' + inputs.template + '.mjml', inputs.data, null, (err, mjml) => {
      if (err) {
        return exits.errorGenerating(err.name)
      }
      const mjmlOutput = mjml2html(mjml)
      if (mjmlOutput.errors.length) {
        return exits.errorGenerating(mjmlOutput.errors)
      }
      const html = mjmlOutput.html
      const Transport = nodemailer.createTransport(sails.config.emails[sails.config.custom.transport])
      const data = {
        from: inputs.from || sails.config.custom.email.main,
        to: inputs.email,
        subject: inputs.subject,
        html: html
      }
      if (inputs.attachments) {
        data.attachments = inputs.attachments
      }
      Transport.sendMail(data, (err, info) => {
        if (err) {
          sails.log.info(`Not Able to send Email: ${inputs.subject} not deivered to ${inputs.email}`, err)
          return exits.errorSending(err)
        }
        sails.log.info(`Email sent: ${inputs.subject} email sent to ${inputs.email}`, info)
        return exits.success(info)
      })
    })
  }
}
