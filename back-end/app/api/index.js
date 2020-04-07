const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const QuizRecordRouter = require('./quizrecord')
const PatientRouter = require('./patients')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/patients', PatientRouter)
router.use('/quizrecord', QuizRecordRouter)

module.exports = router
