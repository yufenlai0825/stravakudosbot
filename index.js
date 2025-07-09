const env = require("dotenv");
env.config();

async function getAccessToken() {
  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: process.env.AUTH_CODE,
      grant_type: "authorization_code",
    });

    console.log("Access Token:", response.data.access_token);
    console.log("Refresh Token:", response.data.refresh_token);
    console.log("Expires At:", response.data.expires_at);
  } catch (err) {
    console.error(
      "Error getting access token:",
      err.response?.data || err.message
    );
  }
}

getAccessToken();
