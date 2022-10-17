const express = require('express')
const { celebrate, Joi, errors, Segments } = require('celebrate')
const { courses, loggedInUser } = require('../models')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('course-registration', { title: `USIS`, courses, loggedInUser })
})

router.post(
  '/courses',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      course: Joi.string().required(),
    }),
  }),
  (req, res) => {
    const course = courses.find(u => u.name === req.body.course)

    console.log(course)

    loggedInUser.addCourse(course)

    return res.redirect('/course-registration')
  }
)

module.exports = router
