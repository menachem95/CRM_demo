import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST as string,
  user: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  database: process.env.MYSQL_DATABASE as string,
});

export default pool;
