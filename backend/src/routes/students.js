const express = require('express')
const Student = require('../models/student')
// const { students } = require('../models')
// const User = require('../models/user')

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res) => {
  const student = await Student.find()
  res.send(student)
})

router.get('/:studentId', async (req, res) => {
  const student = await Student.findById(req.params.studentId)

  if (!student)
    return res.render('error', {
      error: { status: 404 },
      message: `No student with ID ${req.params.studentId} found`,
    })

  return res.send(student)
})

module.exports = router
