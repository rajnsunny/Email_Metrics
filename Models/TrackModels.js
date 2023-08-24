var mongoose = require('mongoose');

var TrackerSchema = new mongoose.Schema({
    TrackerId: {
        type: String,
        required: true
    },
    openby:{
        type: Number,
        default: 0
    },

})


module.exports = mongoose.model('Tracker',TrackerSchema);