const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Patient', {
  patientId: Joi.number().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  quizIds: Joi.array().required(),
})
