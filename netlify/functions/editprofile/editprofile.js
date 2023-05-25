const db = require("../../../utils/connection");
const { User } = require("../../../utils/models");
const  tokenValidation = require("../../../utils/tokenValidation");

exports.handler = async function editProfile(event) {
  
  try {
    await db.connect();

    let sessionId = event.multiValueHeaders?.cookie[0].split('session_token=')[1];
    let isValid = tokenValidation(sessionId);
    if(!isValid){
      return {
        statusCode: 440,
        body: "Session timed out!"
      };
    } 
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server error!"
    };
  }

  await db.connect();
  
  let userInfo = JSON.parse(event.body).formValues;
  console.log(userInfo);
  let email = userInfo.email;
  let password = userInfo.password;

  try {
    // Find the user by ID
    const user = await User.findOne({ email, password});

    if (!user) {
      return {
        statusCode: 404,
        body: "Password is incorrect"
      };
    }

    if(userInfo.newPassword !== userInfo.confirmNewPassword){
      return {
        statusCode: 404,
        body: "Invalid new password, they must be identical."
      };
    }

    user.phoneNumber = userInfo.phoneNumber;
    user.location = userInfo.location;
    user.email = userInfo.email;
    user.password = userInfo.password;

    // Save the updated user data to the database
    await user.save();

    // Return a success response with the updated user data
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Profile updated successfully",
        userInfo: user
      })
    };
  } catch (error) {
    // Return an error response if there was an error updating the user data
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error updating user data", error }),
    };
  }
}
