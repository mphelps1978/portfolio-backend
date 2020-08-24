const Project = require('../../models/project')

module.exports = {

  project: async () => {
    try {
      const project = await Project.find()
      return project.map(p => {
        return {...p._doc, _id: p.id}
      })
    }
    catch (err) {
      throw err
    }
  },

  singleProject: async projectID => {
    try {
      const project = await Project.findById(projectID)
      return project
    }
    catch (err) {
      throw err
    }
  },

  createProjectItem: async (args) => {
    console.log(args);
    const item = new Project ({
      proj_name: args.ProjectItemInput.proj_name,
      description: args.ProjectItemInput.description,
      gh_link: args.ProjectItemInput.gh_link,
      live_link: args.ProjectItemInput.live_link,
      image_url: args.ProjectItemInput.image_url,
    })
    let projectItem
    try {
      const result = await item.save()
      projectItem = result
      return projectItem
    }
    catch (err) {
      throw err
    }
  }
}