require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const isAuth = require('./middleware/is-auth')

const graphQLSchema = require ('./graphql/schema/index')
const graphQLResolvers = require ('./graphql/resolvers/index')

const port = process.env.PORT || 5000

const app = express()

app.use(isAuth)


app.use(bodyParser.json())
mongoose.set('useUnifiedTopology', true);

// Server Sanity Check
app.get('/', (req, res) => {
  res.send('Sanity Check')
})



app.use(
  '/api',
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@portfolioproject.v5w3v.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true }
  )
.then(() => {
  app.listen(port)
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log(err)
})


console.log(`Server live on port ${port}`);