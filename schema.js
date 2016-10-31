import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:4000';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPeople() {
  return fetchResponseByURL('/people/').then(json => json);
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json);
}

function createPersonByUrl(relativeURL, data) {
  return fetch(`${BASE_URL}${relativeURL}`, {
      method: 'POST',
      body:JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
  }).then(res => res.json());
}

function deletePersonByUrl(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`, {method: 'DELETE'}).then(res => res.json());
}

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: person => person.first_name
    },
    lastName: {
      type: GraphQLString,
      resolve: person => person.last_name,
    },
    email: {type: GraphQLString},
    id: {type: GraphQLString},
    username: {type: GraphQLString},
    friends: {
      type: new GraphQLList(PersonType),
      resolve: person => person.friends.map((friend) => fetchPersonByURL(`/people/${friend.id}/`))
    }
  })
});

const PersonInputType = new GraphQLInputObjectType({
  name: 'PersonInput',
  fields: () => ({
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    friends: {type: new GraphQLList(PersonInputType)}
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => fetchPersonByURL(`/people/${args.id}/`)
    }
  })
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'functions to create, edit and delete stuff',
  fields: () => ({
    deletePerson: {
      type: PersonType,
      description: 'Delete an person with id and return the deleted person.',
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (_, { id }) => deletePersonByUrl(`/people/${id}/`)
    },
    addPerson: {
      type: PersonType,
      description: 'Create new person',
      args: {
        person: {type: PersonInputType}
      },
      resolve: (_, args) => createPersonByUrl('/people/', {
        first_name: args.person.firstName,
        last_name: args.person.lastName,
        email: args.person.email.toLowerCase(),
        username: args.person.username,
        friends: args.person.friends
      })
    }
  })
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
