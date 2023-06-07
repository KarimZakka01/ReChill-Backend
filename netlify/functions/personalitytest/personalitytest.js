const db = require("../../../utils/connection");
const { Answer } = require("../../../utils/models");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// exports.handler = async function (event, context) {
//   await db.connect();

//   try {
//     const questions = await Question.find(); // Retrieve all questions from the Questions collection
//     return {
//       statusCode: 200,
//       body: JSON.stringify(questions), // r eturn the questions as a JSON string in the response body
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: error.message }),
//     };
//   }
// };

async function postUserAnswers(event) {
  try {
    const { email, answers } = JSON.parse(event.body); // Parse the user's email and answers from the request body

    const personalityScore = calculatePersonalityScore(answers); // Calculate the user's personality score based on their answers

    const personalityAdjective = assignPersonalityAdjective(personalityScore); // Assign a personality adjective based on the user's personality score
    let updatedAnswers = [];
    answers.forEach((element) => {
      updatedAnswers.push({ choice: element });
    });
    const answer = new Answer({
      // Create a new Answer object with the user's email, answers, personality score, and personality adjective
      email,
      updatedAnswers,
      personalityScore,
      personalityAdjective,
    });

    await answer.save(); // Save the new answer object to the Answers collection in the database
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Answers saved successfully",
        personalityAdjective: personalityAdjective,
      }), // Return a success message as a JSON string in the response body
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

async function getUserPersonality(event) {
  // Handle GET request for retrieving personality adjective for a specific user
  try {
    const email = event.queryStringParameters.email;
    //extracts the value of the query parameter "email" from the request URL and assigns it to a variable email

    const answer = await Answer.findOne({ email });
    //s earching for an Answer document where the email field matches the email value that was extracted from the URL path parameters

    if (!answer) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    const { personalityAdjective } = answer;
    console.log(personalityAdjective);

    return {
      statusCode: 200,
      body: JSON.stringify({ personalityAdjective }),
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
    case "GET":
      return await getUserPersonality(event);

    case "POST":
      return await postUserAnswers(event);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Cors successful",
    }),
  };
};

function calculatePersonalityScore(answers) {
  // I can write logic for calculating the personality score based on the user's answers
  // for example -> assigning points to each answer choice and summing the points
  // for now I will return a random number bewteen 0 and 100
  return Math.floor(Math.random() * 101);
}

function assignPersonalityAdjective(personalityScore) {
  // I can write logic for assigning an adjective to the user based on their personality score
  // for example-} mapping specific score (ranges) to different adjectives
  // for now, I will return a random adjective from a list of possibilities
  const adjectives = [
    "adventurous",
    "creative",
    "curious",
    "empathetic",
    "intelligent",
    "passionate",
    "resilient",
    "brave",
    "extrovert",
    "loving",
  ];
  const randomIndex = Math.floor(Math.random() * adjectives.length - 1);
  return adjectives[randomIndex];
}
