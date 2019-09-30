const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CastSchema = new Schema({
    id: String,
    date: String,
    tags: [String],
    shows: [String]
});

module.exports = mongoose.model('Cast', CastSchema);
