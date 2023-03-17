import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";
dotenv.config();

const cert = fs.readFileSync(
  path.resolve(__dirname, "..", "certificate", String(process.env.GN_CERT))
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: "",
});

const credentials = Buffer.from(
  `${String(process.env.GN_CLIENT_ID)}:${String(process.env.GN_CLIENT_SECRET)}`
).toString("base64");

const authenticate = () => {
  console.log("HELLO");
  return axios({
    method: "POST",
    url: `${String(process.env.GN_ENDPOINT)}/oauth/token`,
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    httpsAgent: agent,
    data: {
      grant_type: "client_credentials",
    },
  });
};

export const GNRequest = async () => {
  const authResponse = await authenticate();
  const accessToken = authResponse.data?.access_token;

  return axios.create({
    baseURL: String(process.env.GN_ENDPOINT),
    httpsAgent: agent,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
