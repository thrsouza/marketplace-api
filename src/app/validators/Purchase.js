const joi = require('joi')

module.exports = {
  body: {
    ad: joi.string().required(),
    content: joi.string().required()
  }
}
