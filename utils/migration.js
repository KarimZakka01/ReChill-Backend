const {
  TherapySessionSchema,
  PersonalityTestSchema,
  YoutubeVideoSchema,
  UserSchema,
  MedicalCenterSchema,
} = require("./schema");

function createDb(connection) {
  const models = {
    PersonalityTest: connection.model("PersonalityTest", PersonalityTestSchema),
    TherapySession: connection.model("TherapySession", TherapySessionSchema),
    YoutubeVideo: connection.model("YoutubeVideo", YoutubeVideoSchema),
    User: connection.model("User", UserSchema),
    MedicalCenter: connection.model("MedicalCenter", MedicalCenterSchema),
  };

  Object.values(models).forEach((model) => {
    model
      .createCollection()
      .then((collection) =>
        console.log(`Collection: ${collection.collectionName} created!`)
      )
      .catch((error) => console.error(error));
  });
}

module.exports = {
  createDb,
};
