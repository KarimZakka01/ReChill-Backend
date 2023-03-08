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

const YoutubeVideoSchema = new mongoose.Schema({
  id: "ObjectId",
  dayNumber: "Number",
  url: "string",
});

module.exports = {
  YoutubeVideoSchema,
  TherapySessionSchema,
  PersonalityTestSchema,
  UserSchema,
};
