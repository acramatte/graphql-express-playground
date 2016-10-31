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
  savePerson(req.body, (person) => res.send(person));
});

router.put('/:id', (req, res) => {
  updatePerson(req.params.id, req.body, (person) => res.send(person));
});

router.delete('/:id', (req, res) => {
  deletePerson(req.params.id, (person) => res.send(person));
});

function savePerson (person, callback) {
  person.id = shortid.generate();
  people.push(person);
  fs.writeFile('people.json', JSON.stringify(people), (err) => callback(person));
}

function updatePerson(id, person, callback) {
  const oldPerson = people.find((p) => id === p.id);
  const personToUpdate = Object.assign({}, oldPerson, person);
  const newPeoples = people.filter((p) => id !== p.id);
  newPeoples.push(personToUpdate);
  fs.writeFile('people.json', JSON.stringify(newPeoples), (err) => callback(personToUpdate));
}

function deletePerson (id, callback) {
  const person = people.find((p) => id === p.id);
  const newPeoples = people.filter((p) => id !== p.id);
  fs.writeFile('people.json', JSON.stringify(newPeoples), (err) => callback(person));
}

module.exports = router;
