const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");
exports.handler = async function (event, context) {
  // Export an async function as the Lambda handler
  const requestBody = JSON.parse(event.body);
  await db.connect();
  const user = await User.findOne({ email: requestBody.email }); // Find a user in the database with the given email
  console.log(user);
  if (user) {
    // If a user is found, return a 401 Unauthorized response
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "User already exists!" }),
    };
  }
  // If no user is found, create a new User instance with the request body
  const newUser = new User(requestBody);

  // Save the new user to the database
  await newUser.save();

  // Return a 200 OK response with a success message
  return {
    statusCode: 200,
    body: "Request body processed successfully.",
  };
};
