var mongoose = require('mongoose');

const OpensByCountriesSchema = new mongoose.Schema({
    country: String,
    count: {
      type: Number,
      default:0
    },
  });
  
const OpensByDeviceSchema = new mongoose.Schema({
    deviceType: String,
    count: {
      type: Number,
      default:0
    },
  });
  

const TimeseriesSchema = new mongoose.Schema({
    totalOpens: {
      type: Number,
      default: 0
    },
    time: {
      type: Date,
      timestamps : true
    },
  });
  

const metricSchema = new mongoose.Schema({
    id: Number,
    open_by_countries:{
        type: [OpensByCountriesSchema]
    },

    open_by_devices:{
        type: [OpensByDeviceSchema]
    },

    timestamps:{
        type: [TimeseriesSchema]
    }

})

module.exports = mongoose.model('Metrics',metricSchema);
