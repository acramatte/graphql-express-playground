'use strict';

import schema from './schema';
const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const peopleRoutes = require('./routes/people');
const bodyParser = require('body-parser')

const root = { hello: () => 'Hello world!' };
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    }
    else {
      next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/people', peopleRoutes);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
