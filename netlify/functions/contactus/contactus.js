const db = require("../../../utils/connection");
const { ContactUs } = require("../../../utils/models");

exports.handler = async function (event, context) {
  // Parse the request body as JSON and extract the email, subject, and message properties
  const { email, subject, message } = JSON.parse(event.body).formValues;

  await db.connect();

  // If any of the required fields are missing, return a 401 Unauthorized response
  if (!email || !subject || !message) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Please fill out all fields!" }),
    };
  }

  const contactus = new ContactUs({ email, subject, message });

  await contactus.save();

  // Return a 200 OK response indicating successful submission
  return {
    statusCode: 200,
    body: "Message sent successfully",
  };
};
