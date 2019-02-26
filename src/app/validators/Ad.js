const joi = require('joi')

module.exports = {
  body: {
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required()
  }
}
