
const Tracker = require('../Models/TrackModels');
const {Connection} = require('../db/redisConnection')
const format = require('../utils/DateTimeFormate');
const Metrics = require('../Models/metrics')



const EventTracker = async (req,res) => {
    const eventPayload = req.body;

    const event = {
        customer_id: eventPayload.customer_id,
        event_id: eventPayload.event_id,
        country: eventPayload.geo_ip["country"],
        gender: eventPayload.rcpt_tags[0],
        device: eventPayload.user_agent_parsed["device_family"]
    }
    
    let devices ;
    if(event.device.match(/Mobile|Android|iPhone/i)) devices = "Mobile";
    else if(event.device.match(/Tablet|ipad/i)) devices = "Tablet";
    else devices = "Desktop";

    Tracker.findOneAndUpdate(
      {TrackerId: "1234"},
      {$inc: {openby: 1}},
      {new : true}

  ).then(() => {
      console.log('Added.');
    })
    .catch((error) => {
      console.error('Error creating new entry:', error);
    });
    // Update opens by countries
    
    const Data = await Metrics.find({});
    if(Data.length == 0){
        await new Metrics({
            open_by_countries:[
                {
                    country: event.country,
                    count: 1
                }
            ],
            open_by_devices:[
                {
                    deviceType: devices,
                    count:1
                }
            ],
            timestamps:[
                {
                    totalOpens: 1,
                    time: format(new Date())
                }
            ]
        }).save()
    }


// Check if the data already exists in opens by countries
Metrics.findOne({ 'open_by_countries.country': event.country })
  .then((existingData) => {
    if (existingData) {
      // Data exists, update the count
      Metrics.updateOne(
        { 'open_by_countries.country': event.country },
        { $inc: { 'open_by_countries.$.count': 1 } }
      )
        .then(() => {
          console.log('Data updated for opens by countries.');
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    } else {
      // Data doesn't exist, insert new entry
      Metrics.updateOne(
        {},
        {
          $push: { open_by_countries: { country: event.country, count: 1 } }
        },
        { upsert: true }
      )
        .then(() => {
          console.log('New entry created for opens by countries.');
        })
        .catch((error) => {
          console.error('Error creating new entry:', error);
        });
    }

    // Check if the data already exists in opens by devices
    Metrics.findOne({ 'open_by_devices.deviceType': devices })
      .then((existingData) => {
        if (existingData) {
          // Data exists, update the count
          Metrics.updateOne(
            { 'open_by_devices.deviceType': devices },
            { $inc: { 'open_by_devices.$.count': 1 } }
          )
            .then(() => {
              console.log('Data updated for opens by devices.');
            })
            .catch((error) => {
              console.error('Error updating data:', error);
            });
        } else {
          // Data doesn't exist, insert new entry
          Metrics.updateOne(
            {},
            {
              $push: { open_by_devices: { deviceType: devices, count: 1 } }
            },
            { upsert: true }
          )
            .then(() => {
              console.log('New entry created for opens by devices.');
            })
            .catch((error) => {
              console.error('Error creating new entry:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error checking data:', error);
      });
  })
  .catch((error) => {
    console.error('Error checking data:', error);
  });

      
    
     const currentTimestamp = Math.floor(Date.now() / 1000);
     
     const eventIdentifier = JSON.stringify(event);
     console.log(eventIdentifier);
    try {
        const redisClient =  await Connection();
        // await redisClient.connect();
      //  redisClient.zAdd("inserted_events", {score: currentTimestamp,value: eventIdentifier});

        res.status(200).send({ msg: "success" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: "Internal Server Error" });
    }


    // console.log(req.query.trackerId);
    // const trackerId = req.query.trackerId;
    // let exists = await Tracker.findOne({TrackerId: trackerId});
    // if(exists){
    //     exists.openby += 1;
    //     await exists.save();
    // }
    // else{
    //     await new Tracker({
    //         TrackerId: trackerId,
    //         openby: 1
    //     }).save();

        
    // }
    //  res.send({msg: "success"});
    
}


module.exports = EventTracker;
