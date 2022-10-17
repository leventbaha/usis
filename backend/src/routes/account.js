const express = require('express')
const passport = require('passport')
const Student = require('../models/student')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.session)
})

router.post('/', async (req, res) => {
  const studentToCreate = {
    studentID: req.body.studentID,
    name: req.body.name,
    year: req.body.year,
    department: req.body.department,
    courses: req.body.courses,
    username: req.body.username,
  }

  const student = new Student(studentToCreate)
  await student.setPassword(req.body.password)
  await student.save()

  return student
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.student)
})

router.delete('/session', (req, res) => {
  req.logout()
  res.send(true)
})

module.exports = router
