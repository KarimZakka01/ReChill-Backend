const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");

async function editProfile(event) {
  // Parse the request body as JSON and extract the user ID
  // Parse the request body as JSON and extract the user ID and data
  const { userId, firstName, lastName, dob, phoneNumber, location, email } =
    JSON.parse(event.body);

  await db.connect();

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // Update the user's data with the new values (except password, gender, and userType)
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.dob = dob ?? user.dob;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;
    user.location = location ?? user.location;
    user.email = email ?? user.email;

    // Save the updated user data to the database
    await user.save();

    // Return a success response with the updated user data
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User data updated", user }),
    };
  } catch (error) {
    // Return an error response if there was an error updating the user data
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error updating user data", error }),
    };
  }
}

exports.handler = async function (event, context) {
  await db.connect();

  switch (event.httpMethod) {
    case "PUT":
      return await editProfile(event);

    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unsupported Method Function" }),
      };
  }
};
