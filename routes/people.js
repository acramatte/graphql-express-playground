const express = require('express');
const router = express.Router();
const people = require('../people.json');

router.get('/', function(req, res) {
  res.send(people);
});

router.get('/:id', function(req, res) {
  res.send(people.find((p) => req.params.id === p.id));
});

module.exports = router;
