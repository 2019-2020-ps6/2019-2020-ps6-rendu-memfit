const { Router } = require('express');

const { Patient } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');

const router = new Router();

router.get('/', (req, res) => {
  try {
    res.status(200).json(Patient.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:patientId', (req, res) => {
  try {
    res.status(200).json(Patient.getById(req.params.patientId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const patient = Patient.create({ ...req.body });
    res.status(201).json(patient);
  } catch (err) {
    manageAllErrors(res, err);
  }
})

router.put('/:patientId', (req, res) => {
  try {
    res.status(200).json(Patient.update(req.params.patientId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:patientId', (req, res) => {
  try {
    Patient.delete(req.params.patientId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/:patientId/addQuiz/:quizId', (req, res) => {
  try {
    const patient = Patient.getById(req.params.patientId);
    let patientUpdated = new Patient;
    patientUpdated.firstName = patient.firstName;
    patientUpdated.lastName = patient.lastName;
    patientUpdated.id = patient.id;
    patientUpdated.photo = patient.photo;
    patientUpdated.quizzesId = [2, 3];

    const updatedPatient = Patient.update(req.params.patientId, patientUpdated)
    res.status(200).json(updatedPatient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})


module.exports = router
