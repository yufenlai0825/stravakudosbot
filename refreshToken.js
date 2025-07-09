const fs = require("fs");
const env = require("dotenv");
const axios = require("axios");
env.config();

async function refreshToken() {
  const tokenPath = "./token.json";
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
  const now = Math.floor(Date.now() / 1000);

  // token is still valid
  if (now < tokenData.expires_at) {
    return tokenData.access_token;
  }
  // token expires
  console.log("Token expires.");
  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: tokenData.refresh_token,
    });

    const newTokenData = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_at: response.data.expires_at,
    };

    fs.writeFileSync(tokenPath, JSON.stringify(newTokenData, null, 2));
    console.log("Refresh and save new token.");
    return newTokenData.access_token;
  } catch (err) {
    console.error(
      "Failed to refresh token:",
      err.response?.data || err.message
    );
    throw err;
  }
}
module.exports = refreshToken;
