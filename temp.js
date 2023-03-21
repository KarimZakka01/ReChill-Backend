async function deleteSession(event) {
  try {
    const { userId, userType, id } = JSON.parse(event.body);

    // If the userType is user
    if (userType === "user") {
      // Find the session by _id
      const session = await TherapySession.findById(id);

      //if session not found
      if (!session) {
        return { statusCode: 404, body: "Session not found" };
      }

      // If the userId of the session does not match the userId in the event
      if (session.userId !== userId) {
        console.log(userId);
        console.log(session.userId);
        return {
          statusCode: 403,
          body: "You are not authorized to delete this session line 82",
        };
      }

      // Delete the session by _id
      await TherapySession.findByIdAndDelete(id);

      //success
      return { statusCode: 200, body: "Session deleted successfully" };
    }
    // If the user Type is therapist
    else if (userType === "therapist") {
      // Find the session by _id
      const session = await TherapySession.findById(id);

      // If sestsion is not found
      if (!session) {
        return { statusCode: 404, body: "Session not found" };
      }

      // Find the therapist by userId
      const therapist = await User.findById(userId);

      // If the user with userId isnt a therapist
      if (therapist.userType !== "therapist") {
        return {
          statusCode: 403,
          body: "You are not authorized to perform this action",
        };
      }

      if (session.therapistId !== userId) {
        return {
          statusCode: 403,
          body: "You are not authorized to delete this session line 114",
        };
      }

      //Delete the session by _id
      await TherapySession.findByIdAndDelete(id);

      //Return success message
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

async function bookSession(event) {
  try {
    const { userId, date, time, location } = JSON.parse(event.body); // Parse the user's userId, date, time, and location from the request body

    const user = await User.findById(userId); // Find the user by their userId

    if (!user) {
      // If user doesn't exist, return 404 error
      return {
        statusCode: 404, //server cannot find the requested resource
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    if (user.userType !== "user") {
      // If user is not a regular user, return 403 error
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: "Only regular users can book sessions",
        }),
      };
    }

    const existingSession = await TherapySession.findOne({ date, time }); // Check if there's already a session at the requested date and time

    if (existingSession) {
      // If session already exists, return 409 error
      return {
        statusCode: 409, //conflict in the requests
        body: JSON.stringify({
          message: "Session already booked at requested date and time",
        }),
      };
    }

    const session = new TherapySession({
      // Create a new TherapySession object with the user's userId, date, time, and location
      userId,
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
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
