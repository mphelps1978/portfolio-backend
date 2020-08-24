const Project = require ('../../models/project')
const Resume = require ('../../models/resume')

const resume = async () => {

  try{
    const resume = await Resume.find()
    return resume.map(r => {
      return {...r._doc, _id: r.id}
    })
  } catch (err) {
    throw err
  }
}

const singleResume = async itemID => {
  try{
    const resume = await Resume.findById(itemID)
    return resume
  } catch (err) {
    throw err
  }
}

const project = async () => {
  try {
    const project = await Project.find()
    return project.map(p => {
      return {...p._doc, _id: p.id}
    })
  } catch (err) {
    throw err
  }
}

const singleProject = async projectID => {
  try {
    const project = await Project.findById(projectID)
    return project
  } catch (err) {
    throw err
  }
}

