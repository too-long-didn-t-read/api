module.exports = {
  friendlyName: 'Logout',
  description: 'Sign the user Off.',
  inputs: {
  },
  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged out.'
    }
  },
  async fn (inputs, exits) {
    this.req.logout()
    return exits.success()
  }
}
