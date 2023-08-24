const {Connection} = require('../db/redisConnection')
const Metrics = require('../Models/metrics');
const format = require('../utils/DateTimeFormate');



const updateData = async () => {
    const client = await Connection();


    const currentTimestamp = Math.floor(Date.now() / 1000);

    const minTimestamp = currentTimestamp - 60;
    
  //  const openBy = client.zCount("inserted_events", minTimestamp, currentTimestamp)
  const Data = await Tracker.findOne({TrackerId: "1234"});
       
  const openBy = Data.openby;
  
  Tracker.findOneAndUpdate(
   {TrackerId: "1234"},
   {$set: {openby: 0}},
   { new : true},
  ).then(() => {
   console.log('Updated Tracker.');
 })
 .catch((error) => {
   console.error('Error creating new entry:', error);
 });
  



Metrics.updateOne(
   {},
   {
     $push: { timestamps: { totalOpens: Data.openby, time: format(new Date()) } }
   },
   { upsert: true }
 )
   .then(() => {
     console.log('New entry created for TImeStamp.');
   })
   .catch((error) => {
     console.error('Error creating new entry:', error);
   });


}


module.exports = updateData;