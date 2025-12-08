import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connection_str: process.env.CONNECTION_STR,
  port: process.env.PORT,
  secret: process.env.SECRETE_AUTH  
};

export default config;
