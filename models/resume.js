const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resumeSchema = new Schema({
    company: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
})

module.exports = mongoose.model('Resume', resumeSchema)