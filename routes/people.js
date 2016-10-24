const express = require('express');
const router = express.Router();
const fs = require('fs')
const people = require('../people.json');

router.get('/', (req, res) => {
  res.send(people);
});

router.get('/:id', (req, res) => {
  res.send(people.find((p) => req.params.id === p.id));
});

router.post('/', (req, res) => {
  saveUser(req.body, () => res.send('saved'));
});

function saveUser (user, callback) {
  people.push(user);
  fs.writeFile('people.json', JSON.stringify(people), (err) => callback());
}

module.exports = router;
