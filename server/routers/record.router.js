const express = require('express');

//have express make me a new Router
const router = express.Router();

const Record = require('../modules/models/record.schema');


router.get('/', (req, res) => {
    Record.find()
        .then((data) => {
            // We got stuff back from the database (no error)
            console.log(`Got stuff back from Mongo: ${data}`);
            res.send(data)
        })
        .catch((error) => {
            console.log(`Error from mongo: ${error}`);
            res.sendStatus(500); // Status for bad stuff happened
        });
});

router.post('/', (req, res) => {
    let recordData = req.body;
    console.log(`Got the record data from request:`, recordData);
    let newRecord = new Record(recordData); // added data to check if fixed bug
    console.log(`New record is ${newRecord}`);
    // newbook.save();
    newRecord.save()
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            //bad stuff happened, but good servers still respond
            console.log('Error adding record:');
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
            // good servers always respond. Say OK.
            console.log(`Id for request is`);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error removing album: ${error}`);
            res.sendStatus(500);
        });
});

// router.get('/', (req, res) => {
//     console.log('Handling my GET for /record');
//     res.send(recordArray);
//     console.log(recordArray);
// });

// router.post('/', (req, res) => {
//     console.log('Handling my POST for /record');
//     let sentRecord = req.body;
//     // I could make 100% sure the objects are exactly the same
//     // on the client and serer, or I could jsut assume they 
//     // may not be and set all the values again. Nice if you 
//     // aren't the one writing the code on both sides.
//     let record = new Record(
//         sentRecord.artist,
//         sentRecord.album,
//         sentRecord.year, [sentRecord.genre],
//     );
//     recordArray.push(record);
//     res.sendStatus(201);
// })

module.exports = router;