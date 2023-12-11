const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lon: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

Data = mongoose.model('Data', dataSchema);
module.exports = {
    Data,
}