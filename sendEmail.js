const env = require("dotenv");
const nodemailer = require("nodemailer");
env.config();

const receivers = process.env.EMAIL_RECEIVER.split(",");

async function sendEmail(msg) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: `"Kudos Bot" <${process.env.EMAIL_USER}>`,
      to: "",
      bcc: receivers,
      subject: "Your Kudos Bot is here!🤖",
      text: msg,
    });
    console.log("Email sent!");
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = sendEmail;
