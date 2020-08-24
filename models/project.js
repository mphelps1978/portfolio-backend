const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
    proj_name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    gh_link: {
      type: String,
      required: true
    },
    live_link: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Project', projectSchema)


