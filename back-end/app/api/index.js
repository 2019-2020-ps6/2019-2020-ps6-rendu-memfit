const {Router} = require('express')
const QuizzesRouter = require('./quizzes')
const QuizRecordRouter = require('./quizrecord')
const PatientRouter = require('./patients')

var path = require('path');

const fs = require("fs");
const multipart = require('connect-multiparty');

var EXT_RE = /(\.[_\-a-zA-Z0-9]{0,16}).*/g;

const multipartMiddleware = multipart({
  uploadDir: './uploads'
});

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))

router.get('/uploads/:fileName', (req, res) => {

  var file = path.resolve(__dirname+'/../../uploads/'+req.params.fileName)
  if (fs.existsSync(file)) {
    res.sendFile(file);
  }else {
    res.status(404)
  }
})

router.post('/upload', multipartMiddleware, (req, res) => {
  console.log()
  if(req.files.uploads[0] !== undefined) {
    var file = req.files.uploads[0].path;
    var newFile = file.split("/").pop();
    console.log(newFile)

    res.json({
      'filepath': file
    });
  }
});
router.use('/quizzes', QuizzesRouter)
router.use('/patients', PatientRouter)
router.use('/quizRecord', QuizRecordRouter)

module.exports = router
