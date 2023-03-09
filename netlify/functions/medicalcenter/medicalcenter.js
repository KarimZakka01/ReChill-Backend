const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");
const { MedicalCenter } = require("../../../utils/models");
exports.handler = async function (event, context) {
  await db.connect();
  const medicalcenter = await MedicalCenter.find();
  return {
    statusCode: 200,
    body: JSON.stringify(medicalcenter),
  };
};
