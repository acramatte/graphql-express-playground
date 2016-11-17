const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortid = require('shortid');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'nedb.db', autoload: true });

router.get('/', (req, res) => {
  db.find({}, (err, people) => {
    res.send(people);
  });
});

router.get('/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, doc) => {
    res.send(people);
  });
});

router.post('/', (req, res) => {
  const people = Object.assign({_id: shortid.generate()}, req.body);
  db.insert(people, (err, newDoc) => {
    res.send(newDoc)
  });
});

router.put('/:id', (req, res) => {
  db.update({ _id: req.params.id},
      req.body,
      {returnUpdatedDocs: true, multi: false},
      (err, numReplaced, affectedDocuments) => {
        res.send(affectedDocuments)
      });
});

router.delete('/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, docToRemove) => {
    db.remove({_id: req.params.id}, {}, (err, numRemoved) => {
      res.send(docToRemove)
    });
  });
});

module.exports = router;
