const models = require("./models");
// Importing Mongoose schemas from schema.js file.

function createDb(connection) {
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

//to create db
