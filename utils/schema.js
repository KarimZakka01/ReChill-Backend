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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  email: "string",
  // An array of answer choices for the user
  answers: [
    {
      // The ID of the question being answered
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      // The value of the selected answer choice
      choice: "Number",
    },
  ],

  personalityScore: "Number",
  //The user's assigned personality adjective
  personalityAdjective: "String",
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
