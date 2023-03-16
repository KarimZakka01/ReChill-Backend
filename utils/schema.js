const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  id: "ObjectId",
  firstName: "string",
  lastName: "string",
  dob: "Date",
  gender: "string",
  phoneNumber: "String",
  location: "string",
  email: "string",
  password: "string",
  userType: "string",
});

const PersonalityTestSchema = new mongoose.Schema({
  id: "ObjectId",
  userId: "ObjectId",
  result: "string",
});

const TherapySessionSchema = new mongoose.Schema({
  id: "ObjectId",
  userId: "ObjectId",
  date: "Date",
  time: "Number",
  location: "String",
});

const YoutubeVideoSchema = new mongoose.Schema(
  {
    id: "ObjectId",
    dayNumber: "Number",
    url: "string",
  },
  { timestamps: true }
);

const MedicalCenterSchema = new mongoose.Schema({
  location: "string",
  address: "string",
  distance: "Number",
});

const ContactUsSchema = new mongoose.Schema({
  email: "string",
  subject: "string",
  message: "string",
});

const QuestionSchema = new mongoose.Schema({
  questionText: "string",
  choices: [
    {
      answerText: "string",
      value: "Number",
      //An array of answer choices for the question with a value given to each choice
    },
  ],
});

const AnswerSchema = new mongoose.Schema({
  email: "string", // The email of the user who submitted the answer
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId, // this will get the id created by mongoose for a document in the Question schema
        ref: "Question", // specify the name of the model that a field should reference (in models file)
      },

      choice: {
        value: "Number", // value of the selected answer choice (used to calculate to get personality)
      },
    },
  ],

  personalityScore: {
    value: "Number",
  },
  //The user's assigned personality adjective
  personalityAdjective: {
    adjective: "String",
  },
});

module.exports = {
  YoutubeVideoSchema,
  TherapySessionSchema,
  PersonalityTestSchema,
  UserSchema,
  MedicalCenterSchema,
  ContactUsSchema,
  QuestionSchema,
  AnswerSchema,
};
