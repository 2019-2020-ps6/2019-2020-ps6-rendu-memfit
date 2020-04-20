const {Router} = require('express')

const {QuizRecord} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const AnswerRecordRouter = require('./answerrecord')
const {buildQuizRecord, buildQuizRecords} = require('./manager')

const router = new Router({ mergeParams: true })

router.use('/:quizRecordId/answerrecord', AnswerRecordRouter)

router.get('/', (req, res) => {
  try {
    const quizRecords = buildQuizRecords()
    res.status(200).json(quizRecords)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizRecordId', (req, res) => {

  console.log('FILS DE GET')
  try {
    const quizRecord = buildQuizRecord(req.params.quizRecordId)
    res.status(200).json(quizRecord)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quizRecord = QuizRecord.create({...req.body})
    res.status(201).json(quizRecord)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizRecordId', (req, res) => {
  try {
    res.status(200).json(QuizRecord.update(req.params.quizRecordId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizRecordId', (req, res) => {
  try {
    QuizRecord.delete(req.params.quizRecordId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
