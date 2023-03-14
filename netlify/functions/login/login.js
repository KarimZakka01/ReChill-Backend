const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {
  // Parse the request body as JSON and extract the email and password properties
  const { email, password } = JSON.parse(event.body);

  await db.connect();

  // Find a user in the database with the given email
  const user = await User.findOne({ email });

  // If no user is found or the email or password does not match, return a 401 Unauthorized response
  if (!user || email !== user.email || password !== user.password) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Wrong email or password!" }),
    };
  }

  // If the user is found and the email and password match, return a 200 OK response indicating success
  return {
    statusCode: 200,
    body: "User logged in",
  };
};
