const joi = require('joi')

module.exports = {
  body: {
    email: joi
      .string()
      .required()
      .email(),
    password: joi.string().required()
  }
}
