const db = require("../../../utils/connection");
const { User, YoutubeVideo } = require("../../../utils/models");
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async function (event, context) {
  const { email, password } = JSON.parse(event.body);
  //youtube video from api
  await db.connect();
  const youtubeVideo = new YoutubeVideo({
    dayNumber: 1,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });

  youtubeVideo.save();
  return {
    statusCode: 200,
    body: "User logged in",
  };
};
