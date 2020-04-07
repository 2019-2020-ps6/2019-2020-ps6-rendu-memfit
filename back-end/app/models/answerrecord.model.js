const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('AnswerRecord', {
  quizRecordId: Joi.number().required(),
  name: Joi.string().required(),
  patientId: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.string().required(),
  correct: Joi.boolean().required(),
  rectified : Joi.boolean()
})
