const express = require('express');
const router = express.Router();
const weatherController = require('../../controller/weatherController');

router
    .route('/forecast')
    .get(weatherController.getForecast);

module.exports = router;