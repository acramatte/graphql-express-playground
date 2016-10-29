const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortid = require('shortid');
const people = require('../people.json');

router.get('/', (req, res) => {
  res.send(people);
});

router.get('/:id', (req, res) => {
  res.send(people.find((p) => req.params.id === p.id));
});

router.post('/', (req, res) => {
  saveUser(req.body, (user) => res.send(user));
});

router.delete('/:id', (req, res) => {
  deletePerson(req.params.id, (user) => res.send(user));
});

function saveUser (user, callback) {
  user.id = shortid.generate();
  people.push(user);
  fs.writeFile('people.json', JSON.stringify(people), (err) => callback(user));
}

function deletePerson (id, callback) {
  const person = people.find((p) => id === p.id);
  const newPeoples = people.filter((p) => id !== p.id);
  fs.writeFile('people.json', JSON.stringify(newPeoples), (err) => callback(person));
}

module.exports = router;
