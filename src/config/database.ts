import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file into process.env

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT) {
  throw new Error("Missing required database environment variables");
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
});
