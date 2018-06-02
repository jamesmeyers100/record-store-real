const express = require('express');
const router = express.Router();
const Record = require('../modules/models/record.schema');

router.get('/', (req, res) => {
    Record.find()
        .then((data) => {
            console.log(`Got stuff back from Mongo: ${data}`);
            res.send(data)
        })
        .catch((error) => {
            console.log(`Error from mongo: ${error}`);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let recordData = req.body;
    console.log(`Got the record data from request:`, recordData);
    let newRecord = new Record(recordData); 
    console.log(`New record is ${newRecord}`);
    newRecord.save()
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    // Delete doesn't use data, so we'll use PARAMS instead
    // data is req.body
    // params is req.query
    let recordId = req.query._id;
    console.log(`Id for request is ${req.query._id}`);
    Record.findByIdAndRemove(recordId)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});


module.exports = router;