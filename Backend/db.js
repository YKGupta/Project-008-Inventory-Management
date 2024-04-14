const mongoose = require('mongoose');
const uri = "mongodb+srv://ykgupta2411:NkJwmIPPS3uU4qtN@database.8mncj2h.mongodb.net/";

const connectToDatabase = () => {
    mongoose.connect(uri).then(() => {
        console.log("MongoDB Connected Successfully!");
    }).catch((error) => {
        console.log("Error when connecting to MongoDB: " + error);
    });
};

module.exports = connectToDatabase;