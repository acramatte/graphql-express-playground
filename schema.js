import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const BASE_URL = 'https://myapp.com/';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPeople() {
  return fetchResponseByURL('/people/').then(json => json.people);
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.person);
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
      resolve: person => person.friends.map(fetchPersonByURL)
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: root => // Fetch the index of people from the REST API,
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`)
    }
  })
});

export default new GraphQLSchema({
  query: QueryType,
});
