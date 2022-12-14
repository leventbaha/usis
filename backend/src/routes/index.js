const express = require('express')
const Student = require('../models/student')
const Course = require('../models/course')

const { courses } = require('../models')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: `USIS`, courses })
})

router.get('/log-in', (req, res) => {
  res.render('log-in', { title: `USIS`, courses })
})

router.get('/initialize', async (req, res) => {
  const marie = new Student({
    studentID: 9587,
    name: 'marie',
    year: 1,
    department: 'Computer Science',
    courses: [],
    username: 'marie9587',
  })
  await marie.setPassword('test')
  await marie.save()

  const markus = new Student({
    studentID: 6881,
    name: 'markus',
    year: 2,
    department: 'Computer Science',
    courses: [],
    username: 'markus6881',
  })
  await markus.setPassword('test')
  await markus.save()

  const thomas = new Student({
    studentID: 5457,
    name: 'thomas',
    year: 4,
    department: 'Physics',
    courses: [],
    username: 'thomas5457',
  })
  await thomas.setPassword('test')
  await thomas.save()

  const günther = new Student({
    studentID: 1549,
    name: 'günther',
    year: 1,
    department: 'Biology',
    courses: [],
    username: 'günther1549',
  })
  await günther.setPassword('test')
  await günther.save()

  const lisa = new Student({
    studentID: 6478,
    name: 'lisa',
    year: 3,
    department: 'Biology',
    courses: [],
    username: 'lisa6478',
  })
  await lisa.setPassword('test')
  await lisa.save()

  // courses
  const math101 = await Course.create({
    name: 'math101',
    year: 1,
    department: ['Computer Science', 'Physics', 'Biology'],
    preRequisites: [],
  })
  const compsci101 = await Course.create({
    name: 'compsci101',
    year: 1,
    department: ['Computer Science'],
    preRequisites: [math101],
  })
  const algorithms201 = await Course.create({
    name: 'algorithms201',
    year: 2,
    department: ['Computer Science'],
    preRequisites: [compsci101],
  })
  const database301 = await Course.create({
    name: 'database301',
    year: 3,
    department: ['Computer Science'],
    preRequisites: [algorithms201],
  })
  const physics401 = await Course.create({
    name: 'physics401',
    year: 4,
    department: ['Physics'],
    preRequisites: [math101],
  })
  const anatomy101 = await Course.create({
    name: 'anatomy101',
    year: 1,
    department: ['Biology'],
    preRequisites: [],
  })
  const evolution301 = await Course.create({
    name: 'evolution301',
    year: 3,
    department: ['Biology'],
    preRequisites: [anatomy101],
  })

  await marie.addCourse(math101)
  await marie.addCourse(compsci101)
  await marie.addCourse(algorithms201)
  await marie.addCourse(database301)
  await markus.addCourse(math101)
  await markus.addCourse(compsci101)
  await markus.addCourse(algorithms201)
  await thomas.addCourse(math101)
  await thomas.addCourse(compsci101)
  await thomas.addCourse(algorithms201)
  await thomas.addCourse(database301)
  await thomas.addCourse(physics401)
  await günther.addCourse(math101)
  await günther.addCourse(anatomy101)
  await lisa.addCourse(anatomy101)
  await lisa.addCourse(evolution301)

  return res.sendStatus(200)
})

module.exports = router
