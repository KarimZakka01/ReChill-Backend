const mongoose = require("mongoose");
const {
  TherapySessionSchema,
  YoutubeVideoSchema,
  UserSchema,
  PersonalityTestSchema,
  MedicalCenterSchema,
} = require("./schema");

const PersonalityTest = mongoose.model(
  "PersonalityTest",
  PersonalityTestSchema
);
const TherapySession = mongoose.model("TherapySession", TherapySessionSchema);
const YoutubeVideo = mongoose.model("YoutubeVideo", YoutubeVideoSchema);
const User = mongoose.model("User", UserSchema);
const MedicalCenter = mongoose.model("MedicalCenter", MedicalCenterSchema);

module.exports = {
  PersonalityTest,
  TherapySession,
  User,
  YoutubeVideo,
  MedicalCenter,
};
