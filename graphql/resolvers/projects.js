const Project = require('../../models/project')

module.exports = {

  projects: async () => {
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

  projectById: async (root,args,context,info) => {
    console.log(args._id);
    try {
      const project = await Project.findOne({id: args._id})
      return project
    }
    catch (err) {
      throw err
    }
  },

  createProjectItem: async (args, req) => {
    if(!req.isAuth) {
      throw new Error("Unauthorized")
    }
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
  },
  deleteProject: async (args, req) => {
    // if(!req.isAuth) {
    //   throw new Error('Not Authorized')
    // }
    try {
      const deletedItem = await Project.findByIdAndDelete(args._id)
      return 'Deleted'
    }
    catch (err)  {
      console.log(err);
      throw err
    }
    // const deletedTodo = await Todo.findByIdAndDelete({ _id });   return { _id: deletedTodo.id,todo: deletedTodo.todo

  }
}