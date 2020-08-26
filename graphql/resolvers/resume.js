const Resume = require ('../../models/resume')

module.exports = {

 resumes: async () => {

    try {
      const resume = await Resume.find()
      return resume.map(r => {
        return {...r._doc, _id: r.id}
      })
    }
    catch (err) {
      throw err
    }
  },

  resumeById: async (root, args, context, info) => {
    try {
      const resume = await Resume.findOne({id: args._id})
      return resume
    }
    catch (err) {
      throw err
    }
  },

  createResumeItem: (args, req) => {
    if(!req.isAuth){
      throw new Error('Unauthorized')
    }
    const resumeItem = new Resume({
      company: args.ResumeItemInput.company,
      year: args.ResumeItemInput.year,
      description: args.ResumeItemInput.description
    })
    return resumeItem
    .save()
    .then(res => {
      console.log(res);
      return {...res._doc, _id: res.id}
    })
    .catch(err => {
      console.log(err);
      throw err
    })
  },

}