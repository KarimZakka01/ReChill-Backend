const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");

exports.handler = async function (event, context) {
  await db.connect();

  try {
    const therapists = await User.find({ userType: "Therapist" }).select(
      "-_id"
    );
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
};
