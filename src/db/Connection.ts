import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';

configDotenv();

export const dbHost = process.env.DB_HOST || 'localhost';
export const dbTable = process.env.DB_TABLE || 'clash-of-spears';
export const dbUser = process.env.DB_USER || 'root';
export const dbPassword = process.env.DB_PASS || '';

export const db = new Sequelize(dbTable, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mariadb'
})
