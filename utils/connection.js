const mongoose = require("mongoose");
const {
  PersonalityTestSchema,
  TherapySessionSchema,
  YoutubeVideoSchema,
  UserSchema,
} = require("./schema");

//Node.js library for working with MongoDB databases.
async function connect() {
  let connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: "rechill",
  });

  return connection;
}

module.exports = {
  connect,
};
