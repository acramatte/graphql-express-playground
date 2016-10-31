# graphql-express playground

Playground for building a GraphQL endpoint atop an existing REST API provided by express

## Usage
```bash
npm start
```

## Examples
### Query all
```
query getAllPeople {
  allPeople{
    id,
    username,
    email
  }
}
```

### Query by ID
```
query getById {
  person(id: "PPBqWA9") {
    firstName,
    lastName,
    friends{
      firstName,
      lastName
    }
  }
}
```

### Add a new person:

```
mutation addPerson {
  addPerson(person: {firstName: "Gabriel", lastName: "Angelos", email: "gabriel@ange.los", username: "gabange"}) {
    id
    firstName
  }
}
```

### Update an existing person:

```
mutation updateAPerson {
  updatePerson(person: {
    id: "PPBqWA9",
    lastName: "Luperculle"
  }) {
    firstName,
    lastName,
    id,
    username
  }
}
```

### Delete a person:

```
mutation deletePerson{
  deletePerson(id: "B1A6qvGxg") {
    firstName,
    lastName,
    username
  }
}
```
