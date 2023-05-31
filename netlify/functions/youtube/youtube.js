const db = require("../../../utils/connection");
const { YoutubeVideo } = require("../../../utils/models");

exports.handler = async function (event, context) {
  await db.connect();

  try {
    const videos = await YoutubeVideo.find();
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    const videoUrl = randomVideo.url;

    return {
      statusCode: 200,
      body: JSON.stringify({ url: videoUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
