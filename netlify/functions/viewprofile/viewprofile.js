const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");

async function getProfile(event) {
  // Find the user in db with id
  const id = event.queryStringParameters.id;
  const user = await User.findById(id);

  // If no user is found -> return 404 not found response
  if (!id) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" }),
    };
  }

  // If the user is found ->return a 200 OK response with the user information
  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
}

exports.handler = async function (event, context) {
  await db.connect();

  switch (event.httpMethod) {
    case "GET":
      return await getProfile(event);

    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unsupported Method Function" }),
      };
  }
};
