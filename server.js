'use strict';

import schema from './schema';
const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const peopleRoutes = require('./routes/people');

const root = { hello: () => 'Hello world!' };

const app = express();

app.use('/people', peopleRoutes);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
