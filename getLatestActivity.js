const env = require("dotenv");
const axios = require("axios");
const sendEmail = require("./sendEmail");
const refreshToken = require("./refreshToken");
env.config();

async function getLatestActivity() {
  // const accessToken = process.env.ACCESS_TOKEN;
  const accessToken = await refreshToken();
  try {
    const response = await axios.get(
      "https://www.strava.com/api/v3/activities",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          per_page: 1, // latest activity
        },
      }
    );
    const activity = response.data[0];
    console.log(`Activity: ${activity.name}`);
    console.log(`Kudos: ${activity.kudos_count}`);
    if (activity.kudos_count < 8) {
      const messages = [
        "Hey! Just posted a workout — show me some love 🥺",
        "👟 Someone's crushing goals in silence... go check it out!",
        "Ah ha! Her code is probably not working (again) so she's working out...🏃‍♀️",
        "Just uploaded an activity — feel free to hit that kudo button 😉",
        "Give me give me give me a nice kudo? 🎶🧡",
      ];

      const randomIndex = Math.floor(Math.random() * 5);
      const msg = messages[randomIndex];

      console.log(`Message to send: ${msg}`);
      await sendEmail(msg);
    } else {
      console.log(`At least 8 Kudos checked!`);
    }
  } catch (err) {
    console.error(
      "Error fetching activity:",
      err.response?.data || err.message
    );
  }
}

getLatestActivity();
