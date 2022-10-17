const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
  name: String,
  date: Date,
  place: String,
})

module.exports = mongoose.model('Exam', examSchema)
