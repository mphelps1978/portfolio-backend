const { buildSchema } = require('graphql')

module.exports =  buildSchema(`


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
        resumes: [ResumeItem!]!
        projects: [ProjectItem!]!
        resumeById(_id:ID!):ResumeItem
        projectById(_id:ID!): ProjectItem

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
    `)