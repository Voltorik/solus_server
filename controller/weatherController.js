const http = require('https')

const host = 'https://api.openweathermap.org/data/2.5/forecast';

const getForecast = async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    const url = `${host}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`;

    try {
        
        const forecast = await fetch(url);
        const data = await forecast.json();
        
        return res.status(200).json(data);
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ getForecastError: err.message });
    }
};

module.exports = {
    getForecast,
}