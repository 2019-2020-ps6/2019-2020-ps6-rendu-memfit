const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Patient', {
  id : Joi.number().required(),
  quizzesId: Joi.array().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  photo: Joi.string(),
})
