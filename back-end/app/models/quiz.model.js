const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  patientId: Joi.number().required(),
  quizName: Joi.string().required(),
  quizTheme: Joi.string().required(),
})
