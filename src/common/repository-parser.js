const Joi = require("joi")

module.exports = class RepositoryParser {
  constructor(repository) {
    const schema = Joi.object({
      repository: Joi.string().pattern(
        /^(?:git\+)?(?:https|http):\/\/\S+[^(\.git)](?:\.git)?$/i
      ),
    })
    const { error } = schema.validate({ repository })
    if (error) {
      throw error
    }

    this.repository = repository
  }

  url() {
    return this.repository.match(
      /^(?:git\+)?((?:https|http):\/\/\S+[^(\.git)])(?:\.git)?$/i
    )[1]
  }
}
