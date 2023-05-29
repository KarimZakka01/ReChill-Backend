const db = require("../../../utils/connection");
const { ContactUs } = require("../../../utils/models");
const nodemailer = require("nodemailer");
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {
  // Parse the request body as JSON and extract the email and password properties
  const { email, subject, message } = JSON.parse(event.body).formValues;
  console.log(email);
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
  // Sending email using Nodemailer
  const transporter = nodemailer.createTransport({
    // Configure your email provider's SMTP settings
    service: "Gmail",
    auth: {
      user: "Chatgpt42001@gmail.com", // Use the user's email as the sender's email address
      pass: "kz@78870922", // Your email password or an app-specific password
    },
  });

  const mailOptions = {
    from: "Chatgpt42001@gmail.com", // Use the user's email as the sender's email address
    to: "karimzakka2001@gmail.com", // Admin's email address
    subject: "New Contact Form Submission",
    text: `You have received a new contact form submission.\n\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Failed to send email" }),
      };
    } else {
      console.log("Email sent: " + info.response);
      return {
        statusCode: 200,
        body: "Message sent successfully",
      };
    }
  });
};
