const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

async function addTherapist(event) {
  try {
    const {
      firstName,
      lastName,
      dob,
      gender,
      phoneNumber,
      location,
      email,
      password,
    } = JSON.parse(event.body);

    // Create a new therapist object
    const therapist = new User({
      firstName,
      lastName,
      dob,
      gender,
      phoneNumber,
      location,
      email,
      password,
      userType: "Therapist",
    });

    await therapist.save(); // Save the therapist object to the database

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Therapist added successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

async function deleteTherapist(event) {
  try {
    const { therapistId } = JSON.parse(event.body);

    // Find the therapist by their ID and delete
    await User.findByIdAndDelete(therapistId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Therapist deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

async function editTherapist(event) {
  try {
    const {
      therapistId,
      firstName,
      lastName,
      dob,
      gender,
      phoneNumber,
      location,
      email,
      password,
    } = JSON.parse(event.body);

    // Find the therapist by their ID
    const therapist = await User.findById(therapistId);

    if (!therapist) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Therapist not found" }),
      };
    }

    // Update the therapist object with the new values
    therapist.firstName = firstName;
    therapist.lastName = lastName;
    therapist.dob = dob;
    therapist.gender = gender;
    therapist.phoneNumber = phoneNumber;
    therapist.location = location;
    therapist.email = email;
    therapist.password = password;

    await therapist.save(); // Save the updated therapist object to the database

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Therapist updated successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

async function viewAllTherapists(event) {
  try {
    const therapists = await User.find({ userType: "Therapist" });

    return {
      statusCode: 200,
      body: JSON.stringify(therapists),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
exports.handler = async function (event, context) {
  await db.connect();

  switch (event.httpMethod) {
    case "POST":
      return await addTherapist(event);

    case "DELETE":
      return await deleteTherapist(event);

    case "GET":
      return await viewAllTherapists(event);

    case "PUT":
      return await editTherapist(event);

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Unsupported Method Function" }),
      };
  }
};
