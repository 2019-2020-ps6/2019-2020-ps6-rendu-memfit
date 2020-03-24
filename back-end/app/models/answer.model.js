const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  type: Joi.string(),
  statement: Joi.string().required(),
  valid: Joi.boolean().required(),
  questionId: Joi.number(),
})
