const {Connection} = require('../db/redisConnection')
const Metrics = require('../Models/metrics');
const format = require('../utils/DateTimeFormate');



const updateData = async () => {
    const client = await Connection();


    const currentTimestamp = Math.floor(Date.now() / 1000);

    const minTimestamp = currentTimestamp - 60;
    
    const openBy = client.zCount("inserted_events", minTimestamp, currentTimestamp)
    
        
    

    
    await Metrics.updateOne(
       { $push: {timestamps: {totalOpens: openBy, time: format(new Date()), }}},
       { upsert: true }
    )

}


module.exports = updateData;