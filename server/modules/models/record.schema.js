const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema(
    {
        artist: { type: String, required: false, unique: true },
        albumName: { type: String, required: false},
        year: { type: Number },
        genreList: { type: String}
    }
);

module.exports = mongoose.model('record', albumSchema);