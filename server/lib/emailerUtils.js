import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

dotenv.config();

const CLIENT_ID = process.env.OAUTH_CLIENTID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
const USER_EMAIL = process.env.USER_EMAIL;

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "https://developers.google.com/oauthplayground");

oauth2Client.setCredentials({
  refresh_token: OAUTH_REFRESH_TOKEN,
});
const accessToken = await oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    clientId: CLIENT_ID,
    user: USER_EMAIL,
    clientSecret: CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
    accessToken: accessToken.token,
  },
});

export default transporter;
