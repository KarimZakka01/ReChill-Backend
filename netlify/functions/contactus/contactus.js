const db = require("../../../utils/connection");
const { ContactUs } = require("../../../utils/models");
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {
  // Parse the request body as JSON and extract the email and password properties
  const { email, subject, message } = JSON.parse(event.body);

  await db.connect();

  // If no user is found or the email or password does not match, return a 401 Unauthorized response
  if (!email || !subject || !message) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Please fill out all fields!" }),
    };
  }

  const contactus = new ContactUs({ email, subject, message });

  await contactus.save();
  // If the user is found and the email and password match, return a 200 OK response indicating success
  return {
    statusCode: 200,
    body: "Message sent Successfully",
  };
};
