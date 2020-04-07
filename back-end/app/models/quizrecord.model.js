const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizRecord', {
  name: Joi.string().required(),
  patientId: Joi.number().required()
});
