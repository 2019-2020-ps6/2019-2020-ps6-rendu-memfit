const { AnswerRecord } = require('../../../models')
const { getQuestionFromQuiz } = require('../manager')

/**
 * filterAnswersFromQuestion.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param questionId
 */
const filterAnswerRecordsFromQuizRecord = (quizId) => {
  return AnswerRecord.get().filter((answer) => (answer.quizRecordId === quizId))
}

module.exports = {
  filterAnswerRecordsFromQuizRecord
}
