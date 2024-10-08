const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption: {
        type: String
    },
    image: {
        type: String
    },
    timestamp: {
        type: String
    },
    coords: {
        type: Array
    }
});

module.exports = mongoose.model('Posts', postSchema);