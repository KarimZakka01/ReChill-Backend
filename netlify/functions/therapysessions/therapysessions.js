const db = require("../../../utils/connection");
const { User, TherapySession } = require("../../../utils/models");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

async function bookSession(event) {
  try {
    const { userId, therapistId, date, time, location } = JSON.parse(
      event.body
    ); // Parse the user's userId, therapistId, date, time, and location from the request body

    const user = await User.findById(userId); // Find the user by their userId

    if (!user) {
      // If user doesn't exist, return 404 error
      return {
        statusCode: 404, //server cannot find the requested resource
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    if (user.userType !== "Standard") {
      // If user is not a regular user, return 403 error
      return {
        statusCode: 403, //client is forbidden from accessing a valid URL
        body: JSON.stringify({
          message: "Only regular users can book sessions",
        }),
      };
    }

    const existingSession = await TherapySession.findOne({
      therapistId,
      date,
      time,
    }); // Check if there's already a session with the requested therapist at the requested date and time

    if (existingSession) {
      // If session already exists, return 409 error
      return {
        statusCode: 409, //conflict in the requests
        body: JSON.stringify({
          message:
            "Session already booked with requested therapist at requested date and time",
        }),
      };
    }

    const session = new TherapySession({
      // Create a new TherapySession object with the user's userId, therapistId, date, time, and location
      userId,
      therapistId,
      date,
      time,
      location,
    });

    await session.save(); // Save the new session object to the TherapySessions collection in the database

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Session booked successfully" }), // Return a success message as a JSON string in the response body
    };
  } catch (error) {
    return {
      statusCode: 500, //server encountered an unexpected condition that prevented it from fulfilling the request
      body: JSON.stringify({ message: error.message }),
    };
  }
}

async function deleteSession(event) {
  try {
    const { userId, userType, id } = JSON.parse(event.body);

    // If the userType is user
    if (userType === "Standard") {
      // Find ession  id (_id)
      const session = await TherapySession.findById(id);

      //if session not found
      if (!session) {
        return { statusCode: 404, body: "Session not found" };
      }

      // If the userId of the session does not match the userId in the event
      if (session.userId.toString() !== userId) {
        //.toString() since session.userId is a mongoose.Types.ObjectId
        return {
          statusCode: 403,
          body: "You are not authorized to delete this session",
        };
      }

      // Delete the session by id (_id)
      await TherapySession.findByIdAndDelete(id);

      //success
      return { statusCode: 200, body: "Session deleted successfully" };
    }
    // If the user Type is therapist
    else if (userType === "Therapist") {
      // Find the session by id
      const session = await TherapySession.findById(id);

      // If session is not found
      if (!session) {
        return { statusCode: 404, body: "Session not found" };
      }

      // Find the therapist by userId
      const therapist = await User.findById(userId);

      // If the user with userId isn't a therapist
      if (therapist.userType !== "Therapist") {
        return {
          statusCode: 403, //client is forbidden from accessing a valid URL
          body: "You are not authorized to perform this action since you are not a therapist",
        };
      }

      // Check if therapistId of session matches userId in event
      if (session.therapistId.toString() !== userId) {
        return {
          statusCode: 403, //client is forbidden from accessing a valid URL
          body: "You are not authorized to delete this session",
        };
      }

      // Delete the session by id
      await TherapySession.findByIdAndDelete(id);

      // Return success message
      return { statusCode: 200, body: "Session deleted successfully" };
    }
    // If the userType is neither user nor therapist, return 400 error
    else {
      return {
        statusCode: 400,
        body: "Invalid userType. Allowed values: user, therapist",
      };
    }
  } catch (error) {
    // If there is an error
    return { statusCode: 500, body: error.message };
  }
}

async function getSessions(event) {
  try {
    const { userId, userType } = JSON.parse(event.body);

    //if the userType is user
    if (userType === "Standard") {
      //find all sessions where the userId matches
      const sessions = await TherapySession.find({ userId });

      //Return the sessions
      return {
        statusCode: 200,
        body: JSON.stringify(sessions),
      };
    }
    //If the userType is therapist
    else if (userType === "Therapist") {
      // Find the therapist by userId
      const therapist = await User.findById(userId);

      // If the user with userId is not a therapist, return 403 error
      if (therapist.userType !== "Therapist") {
        return {
          statusCode: 403, //client is forbidden from accessing a valid URL
          body: "You are not authorized to perform this action",
        };
      }

      // Find all sessions where the therapistId matches
      //return all documents from the TherapySession collection where the therapistId field matches the userId value passed in.
      const sessions = await TherapySession.find({ therapistId: userId });

      // Return the sessions
      return {
        statusCode: 200,
        body: JSON.stringify(sessions),
      };
    }
    // If the userType is neither user nor therapist, return 400 error
    else {
      return {
        statusCode: 400, //client error
        body: "Invalid userType. Allowed values: Standard, Therapist",
      };
    }
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
}

exports.handler = async function (event, context) {
  await db.connect();

  switch (event.httpMethod) {
    case "POST":
      return await bookSession(event);

    case "DELETE":
      return await deleteSession(event);

    case "GET":
      return await getSessions(event);

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Unsupported Method Function" }),
      };
  }
};
