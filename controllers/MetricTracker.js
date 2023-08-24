const Tracker = require('../Models/TrackModels');
const metrics = require('../Models/metrics');

const MetricTracker = async (req,res) => {
    

    const obj = await metrics.findOne({});
    const data = JSON.stringify(obj);
    res.status(200).send(data);
}

module.exports = MetricTracker;