const { Data } = require('../model/dataSchema');

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const locationUrl = 'http://api.openweathermap.org/geo/1.0/reverse'

const getForecast = async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    const url = `${forecastUrl}?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`;

    try {
        const forecast = await fetch(url);
        const data = await forecast.json();
        
        return res.status(200).json(data);
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ getForecastError: err.message });
    }
};

const postUserData = async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `${locationUrl}?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.API_KEY}`
    try {
        const location = await fetch(url);
        const data = await location.json();

        const newData = await Data.create({
            location: `${data[0].name}, ${data[0].state}`,
            lat: lat,
            lon: lon,
        });

        res.status(201).json({
            message: 'User data saved.',
            user: newData,
        });
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ postUserDataError: err.message });
    }
}

const getUserData = async (req, res) => {
    try {
        const data = await Data.find({});
        if(data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({
                message: 'No data found',
            });
        } 
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getForecast,
    postUserData,
    getUserData
}