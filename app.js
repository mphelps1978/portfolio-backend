require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema }= require('graphql')


const port = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json())

//Server Sanity Check
// app.get('/', (req, res) => {
//   res.send('Sanity Check')
// })

app.use('/api', graphqlHTTP({
    schema: buildSchema(`
      type RootQuery {
        resume: [String!]!
        portfolio: [String!]!
      }
      type RootMutation {
        createResumeItem(name: String): String
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      resume: () => {
        return ['2020', 'Lambda School', 'Team Lead', 'Did stuff with teams']
      },
      portfolio: () => {
        return ['TallyAI', 'An application that did stuff', 'The Github Link', 'The Live Link', 'The ImageURL']
      },
      createResumeItem: (args) => {
        const eventName = args.name
        return eventName
      }
    },
    graphiql: true
  })
)

app.listen(port, () => {
  console.log(`Server is now live on port ${port}`);

})