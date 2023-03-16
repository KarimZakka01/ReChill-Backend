const mongoose = require("mongoose");
const {
  TherapySessionSchema,
  YoutubeVideoSchema,
  UserSchema,
  PersonalityTestSchema,
  MedicalCenterSchema,
  ContactUsSchema,
  QuestionSchema,
  AnswerSchema,
} = require("./schema");

const PersonalityTest = mongoose.model(
  "PersonalityTest",
  PersonalityTestSchema
);
const TherapySession = mongoose.model("TherapySession", TherapySessionSchema);
const YoutubeVideo = mongoose.model("YoutubeVideo", YoutubeVideoSchema);
const User = mongoose.model("User", UserSchema);
const MedicalCenter = mongoose.model("MedicalCenter", MedicalCenterSchema);
const ContactUs = mongoose.model("ContactUs", ContactUsSchema);
const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = {
  PersonalityTest,
  TherapySession,
  User,
  YoutubeVideo,
  MedicalCenter,
  ContactUs,
  Question,
  Answer,
};

//initializing all models; allows us to use the functions
