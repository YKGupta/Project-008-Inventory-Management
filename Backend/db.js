const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/RaviTraders";

const connectToDatabase = () => {
    mongoose.connect(uri).then(() => {
        console.log("MongoDB Connected Successfully!");
    }).catch((error) => {
        console.log("Error when connecting to MongoDB: " + error);
    });
};

module.exports = connectToDatabase;