# graphql-express playground

Playground for building a GraphQL endpoint atop an existing REST API provided by express

## Usage
```bash
npm start
```

## Add a new person:
In graphiQL:
```
mutation addPerson {
  addPerson(person: {firstName: "Gabriel", lastName: "Angelos", email: "gabriel@ange.los", username: "gabange"}) {
    id
    firstName
  }
}
```
