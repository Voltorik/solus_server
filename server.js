require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 5050;

connectDB();

// Activate middleware cors
app.use(cors(corsOptions));

// Built-in middleware for urlencoded data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Weather API Routes
app.use('/v1/weather', require('./routes/api/weatherRoutes'));

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});