const {
  TherapySessionSchema,
  PersonalityTestSchema,
  YoutubeVideoSchema,
  UserSchema,
  MedicalCenterSchema,
} = require("./schema");
// Importing Mongoose schemas from schema.js file.

function createDb(connection) {
  const models = {
    // Defining an object named "models" to hold Mongoose models.
    PersonalityTest: connection.model("PersonalityTest", PersonalityTestSchema),
    // Creating a Mongoose model (from schema) named "PersonalityTest" using "PersonalityTestSchema".
    TherapySession: connection.model("TherapySession", TherapySessionSchema),
    YoutubeVideo: connection.model("YoutubeVideo", YoutubeVideoSchema),
    User: connection.model("User", UserSchema),
    MedicalCenter: connection.model("MedicalCenter", MedicalCenterSchema),
  };

  Object.values(models).forEach((model) => {
    // Looping through all models in the "models" object using forEach method.
    model
      .createCollection() // Creating a collection for the current model using createCollection method.
      .then(
        (
          collection // Handling success of createCollection method.
        ) => console.log(`Collection: ${collection.collectionName} created!`) // Logging the name of the created collection.
      )
      .catch((error) => console.error(error)); // Handling any errors that occur during the createCollection method.
  });
}

module.exports = {
  // Exporting an object as a module.
  createDb, // Exporting the "createDb" function as a property of the exported object.
};
