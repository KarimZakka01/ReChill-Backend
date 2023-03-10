const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {
  const { email, password } = JSON.parse(event.body);

  await db.connect();
  const user = await User.findOne({ email });
  if (!user || email !== user.email || password !== user.password) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Wrong email or password!" }),
    };
  }
  return {
    statusCode: 200,
    body: "User logged in",
  };
};
