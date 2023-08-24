const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const dbConnection = require('./db/dbConnections');

const Metrics = require('./routes/trackMetrics');
const {Connection} = require('./db/redisConnection');
const updateDataInDatabase = require('./controllers/DataUpdate');
app.use(express.json());
app.use('',Metrics);


const intervalTime = 60 * 1000; // 1 minute in milliseconds
const updateInterval = setInterval(updateDataInDatabase, intervalTime);



app.listen(PORT,() => {
    dbConnection()
    Connection()
    console.log(`Servers connected to PORT: ${PORT}`);
})