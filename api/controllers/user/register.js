module.exports = {
  friendlyName: 'Register',
  description: 'Register a user.',
  inputs: {
    email: {
      type: 'string',
      description: 'User\'s email',
      required: true
    },
    username: {
      type: 'string',
      description: 'User\'s username',
      required: false
    },
    password: {
      type: 'string',
      description: 'User\'s password',
      required: false
    }
  },
  exits: {
    serverError: {
      responseType: 'serverError'
    },
    created: {
      responseType: 'created'
    }
  },
  fn: async function (inputs, exits) {
    if (!inputs.username) {
      inputs.username = inputs.email.replace(/@.*$/, '')
    }
    try {
      return exits.created(await User.sendConfirmationMail(await User.create(User.protect({
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
      })).fetch()))
    } catch(e) {
      return exits.serverError(e)
    }
  }
}
