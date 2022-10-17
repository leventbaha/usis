/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const courseSchema = new mongoose.Schema({
  name: String,
  year: Number,
  department: [String],
  preRequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      autopopulate: { maxDepth: 1 },
    },
  ],
  takenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      autopopulate: { maxDepth: 1 },
    },
  ],
  courseLimit: Number,
  slots: [
    {
      day: Number,
      start: Number,
      length: Number,
    },
  ],
})
class Course {
  async registerStudent(student) {
    if (this.takenBy.length >= this.courseLimit) throw new Error('This course is full.')

    if (this.preRequisites.some(p => !student.courses.find(c => c._id.equals(p._id))))
      throw new Error(`${student.name} does not fulfill prerequisites for ${this.name}.`)

    this.takenBy.push(student)

    await this.save()
  }
}

courseSchema.loadClass(Course)
courseSchema.plugin(autopopulate)

module.exports = mongoose.model('Course', courseSchema)
