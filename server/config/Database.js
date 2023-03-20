import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "3306";
const dbUser = process.env.DB_USER || "root";
const dbPass = process.env.DB_PASS || "";
const dbName = process.env.DB_NAME || "";

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
});

export default db;
