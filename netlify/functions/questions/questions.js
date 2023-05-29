const db = require("../../../utils/connection");
const { Question } = require("../../../utils/models");

exports.handler = async function (event, context) {
  await db.connect();

  try {
    const questions = await Question.find(); // Retrieve all questions from the Questions collection
    return {
      statusCode: 200,
      body: JSON.stringify(questions), // return the questions as a JSON string in the response body
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
