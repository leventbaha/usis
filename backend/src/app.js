require('dotenv').config({ debug: process.env.DEBUG, path: '../.env' })
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const mongoose = require('mongoose')
const helmet = require('helmet')
const BodyParser = require('body-parser')
const { celebrate, Joi, errors, Segments } = require('celebrate')
const mongoSanitize = require('express-mongo-sanitize')

require('./database-connection')
const Student = require('./models/student')

const indexRouter = require('./routes/index')
const studentsRouter = require('./routes/students')
const courseRegistrationRouter = require('./routes/course-registration')
const accountRouter = require('./routes/account')

const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

const app = express()
app.use(BodyParser.json())

app.use(mongoSanitize())

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().integer(),
      role: Joi.string().default('admin'),
    }),
    [Segments.QUERY]: {
      token: Joi.string().token().required(),
    },
  })
)
app.use(errors())

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use(helmet())

app.set('trust proxy', 1)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'images', 'favicon.ico')))

app.use(
  session({
    secret: ['thisisnotasupersecuresecretsecret', 'thisisanothersupersecret'],
    store: MongoStore.create({ clientPromise, stringify: false }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: 'none',
      secure: true,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(Student.createStrategy())

passport.serializeUser(Student.serializeUser())
passport.deserializeUser(Student.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/', indexRouter)
app.use('/api/account', accountRouter)
app.use('/api/students', studentsRouter)
app.use('/api/course-registration', courseRegistrationRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
