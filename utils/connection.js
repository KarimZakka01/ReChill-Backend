const mongoose = require("mongoose");
const {
  TherapySessionSchema,
  PersonalityTestSchema,
  YoutubeVideoSchema,
  UserSchema,
} = require("./schema");
//Node.js library for working with MongoDB databases.
async function connect() {
  let connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: "rechill",
  });
  const models = {
    PersonalityTest: connection.model("PersonalityTest", PersonalityTestSchema),
    TherapySession: connection.model("TherapySession", TherapySessionSchema),
    YoutubeVideo: connection.model("YoutubeVideo", YoutubeVideoSchema),
    User: connection.model("User", UserSchema),
  };

  Object.values(models).forEach((model) => {
    model
      .createCollection()
      .then((collection) =>
        console.log(`Collection: ${collection.collectionName} created!`)
      )
      .catch((error) => console.error(error));
  });

  return { connection, models };
}

module.exports = {
  connect,
};
