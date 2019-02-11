import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
var devSchema = new Schema({
    id: Number,
    title: String,
    time: String,
    date: String,
    location: String,
    descript: String,
    audience: String,
    url: String,
    lat: Number,
    lng: Number,
});

var Dev = mongoose.model('devCollection', devSchema, 'devCollection');

export default Dev;