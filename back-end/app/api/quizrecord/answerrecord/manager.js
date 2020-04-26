const { AnswerRecord } = require('../../../models')

/**
 * filterAnswersFromQuestion.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizRecordId
 */
const filterAnswerRecordsFromQuizRecord = (quizRecordId) => {
  return AnswerRecord.get().filter((answer) => (answer.quizRecordId == quizRecordId))
}

module.exports = {
  filterAnswerRecordsFromQuizRecord
}
