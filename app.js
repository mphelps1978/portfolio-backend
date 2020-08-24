require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema }= require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Resume = require('./models/resume')
const Project = require('./models/project')
const User = require('./models/user')


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

      type User {
        _id: ID!
        userName: String!
        password: String
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

      input UserInput {
        userName: String!
        password: String!
      }

      type RootQuery {
        resume: [ResumeItem!]!
        project: [ProjectItem!]!
      }

      type RootMutation {
        createResumeItem(ResumeItemInput: ResumeItemInput): ResumeItem
        createProjectItem(ProjectItemInput: ProjectItemInput): ProjectItem
        createUser(UserInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      resume: () => {
        return Resume.find()
        .then(resume => {
          return resume.map(r => {
            return {...r._doc, _id: r.id}
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
            return {...p._doc, _id: p.id}
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
          return {...res._doc, _id: res.id}
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
          return {...res._doc, _id: res.id}
        })
        .catch(err => {
          console.log(err);
          throw err
        })
      },
      createUser: args => {
        return User.findOne({ userName: args.UserInput.userName })
          .then(user => {
            if (user) {
              throw new Error('Username in use.');
            }
            return bcrypt.hash(args.UserInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              userName: args.UserInput.userName,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
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