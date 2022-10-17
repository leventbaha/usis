const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
const Course = require('./course')

const studentSchema = new mongoose.Schema({
  studentID: Number,
  name: String,
  year: Number,
  department: String,
  username: String,
  password: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      autopopulate: { maxDepth: 1 },
    },
  ],
})
class Student {
  async addCourse(course) {
    await course.registerStudent(this)
    this.courses.push(course)
    await this.save()
  }

  // get upcomingExams() {}
}

studentSchema.loadClass(Student)
studentSchema.plugin(autopopulate)
studentSchema.plugin(passportLocalMongoose, {
  usernameField: 'username',
})

module.exports = mongoose.model('Student', studentSchema)
