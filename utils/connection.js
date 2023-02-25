const mongoose = require("mongoose");
function connect(){
    console.log(process.env.MONGO_URL);
    return mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
    connect
}