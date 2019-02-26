const joi = require('joi')

module.exports = {
  body: {
    name: joi.string().required(),
    email: joi
      .string()
      .required()
      .email(),
    password: joi
      .string()
      .required()
      .min(6)
  }
}
