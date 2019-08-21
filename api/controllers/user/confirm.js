module.exports = {
  friendlyName: 'Confirm',
  description: 'Confirm a user email.',
  inputs: {
    confirmationString: {
      type: 'string',
      description: 'verification token already sent to user via email',
      required: true
    },
    username: {
      type: 'string',
      description: 'username of the user',
      required: true
    }
  },
  exits: {
    serverError: {
      responseType: 'serverError'
    },
    notFound: {
      responseType: 'notFound'
    },
    noContent: {
      responseType: 'noContent'
    },
    expired: {
      description: 'The link you have provided has expired',
      responseType: 'gone'
    },
    success: {
      responseType: 'ok'
    }
  },
  fn: async function (inputs, exits) {
    try {
      let user = await User.findOne({ username: inputs.username })
      if (!user) {
        return exits.notFound()
      }
      if (user.isConfirmed) {
        return exits.noContent()
      }
      if (user.confirmationString === inputs.confirmationString) {
        if (user.confirmationExpireOn < new Date().valueOf()) {
          return exits.expired('The link you have provided has expired')
        }
        user = await User.updateOne({ id: user.id }).set({ isConfirmed: true })
        return exits.success(user)
      }
      return exits.expired('The link you have provided has expired')
    } catch (e) {
      return exits.serverError(e)
    }
  }
}
