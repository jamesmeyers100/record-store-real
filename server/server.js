const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const recordRouter = require('./routers/record.router');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/record', recordRouter);


//MONGOOSE STUFF
const mongoose = require('mongoose');

const DATABASE_NAME = 'recordStore'
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
mongoose.connect(DATABASE_URL);


mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${DATABASE_URL}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connection error: ${error}`);
});
// END MONGOOSE


app.use( '/record', recordRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));

