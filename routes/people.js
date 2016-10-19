const express = require('express');
const router = express.Router();
const people = require('../people.json');

router.get('/', function(req, res) {
  res.send(people);
});

router.get('/about', function(req, res) {
  res.send('About people');
});

module.exports = router;
