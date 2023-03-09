const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");
exports.handler = async function (event, context) {
  const requestBody = JSON.parse(event.body);
  await db.connect();
  const user = await User.findOne({ email: requestBody.email });
  if (user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "User already exists!" }),
    };
  }
  const newUser = new User(requestBody);
  await newUser.save();
  return {
    statusCode: 200,
    body: "Request body processed successfully.",
  };
};
