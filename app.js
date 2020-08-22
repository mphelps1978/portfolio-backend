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
      createResume(name: String): String

    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }


  `),
  rootValue: {

  }
}))

app.listen(port, () => {
  console.log(`Server is now live on port ${port}`);

})