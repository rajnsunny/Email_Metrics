const router = require('express').Router();
const EventTracker = require('../controllers/EventTracker');
const MetricTracker = require('../controllers/MetricTracker');

router.post('/event',EventTracker)
    .get('/metrics',MetricTracker)




module.exports = router;