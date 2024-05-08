const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect("mongodb+srv://akbarali:akbarali2206@cluster0.1t6ltwf.mongodb.net/educrm?retryWrites=true&w=majority")
        .then(() => {
            console.log("Connected to MongoDb...");
        })
        .catch(err => {
            console.log("Could not connect to MongoDb...", err);
        });
}