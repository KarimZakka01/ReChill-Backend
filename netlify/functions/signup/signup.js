const db = require("../../../utils/connection");
exports.handler = async function (event, context) {
  const requestBody = event.body;
  const conn = await db.connect();
  console.log("2");
  // const user = await conn.models.User.findOne({ email: requestBody.email });
  // console.log("2");
  // if (user) {
  //   return {
  //     statusCode: 401,
  //     body: JSON.stringify({ message: "User already exists!" }),
  //   };
  // }
  console.log("1");
  const newUser = new conn.models.User(requestBody);
  await newUser.save();
  console.log(newUser);
  return {
    statusCode: 200,
    body: "Request body processed successfully.",
  };
};
