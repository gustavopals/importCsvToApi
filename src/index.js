import axios from "axios";
import fs from "fs";
import { convertCsvToJson } from "./utils/convertCsvToJson.js";
import { doLogin } from "./utils/login.js";
import { getBody } from "./utils/getBody.js";
import { config } from "dotenv";

const filePath = "./tmp/file.csv";

async function importCsvToApi() {
  const url = `${process.env.API_URL}api/LBL_TABLESSTR`;

  const login = await doLogin();
  const token = login.token;

  console.log(token);

  const fileData = fs.readFileSync(filePath, "utf8");
  const fileDataArray = fileData.split("\n");

  for (const item of fileDataArray) {
    const excelData = convertCsvToJson(item);
    const postBody = getBody(excelData);
    try {
      const response = await axios.post(url, postBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`API response:`, response.data);
    } catch (error) {
      console.error(`API error:`, error);
    }
  }
  console.log("Done!");
  return;
}

config();
importCsvToApi();
