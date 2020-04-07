const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Patient', {
  quizzesId: Joi.array().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  photo: Joi.string(),
})
