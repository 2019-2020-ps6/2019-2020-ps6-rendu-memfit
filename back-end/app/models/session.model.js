const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Session', {
  quizId: Joi.number().required(),
  patientId: Joi.number().required(),
  questionId: Joi.number().required(),
  reponseSelectedId: Joi.number().required(),
  rectification: Joi.boolean().required()
})
