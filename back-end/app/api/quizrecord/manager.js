const { QuizRecord } = require('../../models');
const { filterAnswerRecordsFromQuizRecord } = require('./answerrecord/manager')

const buildQuizRecord = (quizRecordId) => {
  const quizRecord = QuizRecord.getById(quizRecordId);
  const answerRecords = filterAnswerRecordsFromQuizRecord(quizRecord.id);


  return { ...quizRecord, records: answerRecords }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizRecords = () => {
  const quizRecords = QuizRecord.get();
  return quizRecords.map((quizRecord) => buildQuizRecord(quizRecord.id))
}

module.exports = {
  buildQuizRecord,
  buildQuizRecords,
}
