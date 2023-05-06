const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");


exports.handler = async function (event, context) {
  
  try {
    // Parse the request body as JSON and extract the email and password properties
    const { email, password } = JSON.parse(event.body);

    await db.connect();

    // Find a user in the database with the given email
    const user = await User.findOne({ email, password});
    console.log(user);
    // If no user is found or the email or password does not match, return a 401 Unauthorized response
    if (!user || email !== user.email || password !== user.password) {
      return {
        statusCode: 401,
        body: "Wrong email or password!"
      };
    }

    // If the user is found and the email and password match, return a 200 OK response indicating success
    return {
      statusCode: 200,
      body: "User logged in",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body:  "Internal server error"
    };
  }
};