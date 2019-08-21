module.exports = {
  friendlyName: 'Vote',
  description: 'Creates or updates a vote by a user on a clause.',
  inputs: {
    vote: {
      type: 'string',
      description: 'either the vote is up or down.',
      required: true
    },
    clause: {
      type: 'string',
      description: 'The id of the clause item to vote to.',
      required: true
    }
  },
  exits: {
    notFound: {
      responseType: 'notFound'
    },
    serverError: {
      responseType: 'serverError'
    },
    noContent: {
      responseType: 'noContent'
    },
    created: {
      responseType: 'created'
    },
    success: {
      responseType: 'ok'
    }
  },
  fn: async function (inputs, exits) {
    try {
      const clause = await Clause.find({id: inputs.clause})
      if (!clause) {
        return exits.notFound(new Error(`no clause exists with the id ${inputs.clause}`))
      }
      let vote = await Vote.findOne({ user: this.req.user.id, clause: inputs.clause })
      if (!vote) {
        vote = await Vote.create({ user: this.req.user.id, clause: inputs.clause, votedOk: inputs.vote === 'up' })
        return exits.created(vote)
      } else {
        if (vote.votedOk ^ (inputs.vote !== 'up')) {
          return exits.noContent()
        } else {
          vote = Vote.updateOne({id: vote.id}).set({votedOk: inputs.vote === 'up' }).fetch()
          return exits.success(vote)
        }
      }
    } catch (e) {
      return exits.serverError(e)
    }
  }
}
