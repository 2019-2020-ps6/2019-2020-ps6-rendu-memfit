const { Router } = require('express')
const { AnswerRecord } = require('../../../models')

const { filterAnswerRecordsFromQuizRecord } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const answers = filterAnswerRecordsFromQuizRecord(req.params.quizRecordId)
    res.status(200).json(answers)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

// router.get('/:answerRecordId', (req, res) => {
//   try {
//     const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerRecordId)
//     res.status(200).json(answer)
//   } catch (err) {
//     if (err.name === 'NotFoundError') {
//       res.status(404).end()
//     } else {
//       res.status(500).json(err)
//     }
//   }
// })

router.post('/', (req, res) => {
  try {
    const answer = AnswerRecord.create({ ...req.body, questionId: req.params.quizRecordId })
    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

// router.put('/:answerId', (req, res) => {
//   try {
//     const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
//     const updatedAnswer = Answer.update(req.params.answerId, { ...req.body, questionId: answer.questionId })
//     res.status(200).json(updatedAnswer)
//   } catch (err) {
//     if (err.name === 'NotFoundError') {
//       res.status(404).end()
//     } else if (err.name === 'ValidationError') {
//       res.status(400).json(err.extra)
//     } else {
//       res.status(500).json(err)
//     }
//   }
// })

// router.delete('/:answerId', (req, res) => {
//   try {
//     getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
//     Answer.delete(req.params.answerId)
//     res.status(204).end()
//   } catch (err) {
//     if (err.name === 'NotFoundError') {
//       res.status(404).end()
//     } else {
//       res.status(500).json(err)
//     }
//   }
// })

module.exports = router
