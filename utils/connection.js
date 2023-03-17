const mongoose = require("mongoose");
const { createDb } = require("./migration");

//Node.js library for working with MongoDB databases.
async function connect() {
  let connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: "rechill",
  });
  createDb(connection);
  mongoose.set("strictQuery", true);
  return connection;
}

module.exports = {
  connect,
};
