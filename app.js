require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema }= require('graphql')
const mongoose = require('mongoose')

const Resume = require('./models/resume')
const Project = require('./models/project')


const port = process.env.PORT || 5000

const app = express()


app.use(bodyParser.json())

//Server Sanity Check
// app.get('/', (req, res) => {
//   res.send('Sanity Check')
// })

app.use('/api', graphqlHTTP({
    schema: buildSchema(`

      type ResumeItem {
        _id: ID!
        company: String!
        year: String!
        description: String!
      }

      type ProjectItem {
        _id: ID!
        proj_name: String!
        description: String!
        gh_link: String!
        live_link: String!
        image_url: String!
      }

      input ResumeItemInput {
        company: String!
        year: String!
        description: String!
      }

      input ProjectItemInput {
        proj_name: String!
        description: String!
        gh_link: String!
        live_link: String!
        image_url: String!
      }

      type RootQuery {
        resume: [ResumeItem!]!
        project: [ProjectItem!]!
      }
      type Mutation {
        createResumeItem(ResumeItemInput: ResumeItemInput): ResumeItem
        createProjectItem(ProjectItemInput: ProjectItemInput): ProjectItem
      }

      schema {
        query: RootQuery
        mutation: Mutation
      }
    `),
    rootValue: {
      resume: () => {
        return Resume.find()
        .then(resume => {
          return resume.map(r => {
            return {...r._doc, _id: r._doc._id.toString()}
          })
        })
        .catch(err => {
          console.log(err)
          throw err
        })
      },

      project: () => {
         return Project.find()
        .then(project => {
          console.log(project)
          return project.map(p => {
            return {...p._doc}
          })
        })
        .catch(err => {
          console.log(err);
          throw err
        })
      },

      createResumeItem: (args) => {
        const resumeItem = new Resume({
          company: args.ResumeItemInput.company,
          year: args.ResumeItemInput.year,
          description: args.ResumeItemInput.description
        })
        return resumeItem
        .save()
        .then(res => {
          console.log(res);
          return {...res._doc}
        })
        .catch(err => {
          console.log(err);
          throw err
        })
      },

      createProjectItem: (args) => {
        const projectItem = new Project ({
          proj_name: args.ProjectItemInput.proj_name,
          description: args.ProjectItemInput.description,
          gh_link: args.ProjectItemInput.gh_link,
          live_link: args.ProjectItemInput.live_link,
          image_url: args.ProjectItemInput.image_url,
        })
        return projectItem
        .save()
        .then(res =>{
          console.log(res);
          return {...res._doc}
        })
        .catch(err => {
          console.log(err);
          throw err
        })
      }
    },
    graphiql: true
  })
)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@portfolioproject.v5w3v.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`)
.then(() => {
  app.listen(port)
})
.catch(err => {
  console.log(err)
})


console.log(`Server live on port ${port}`);