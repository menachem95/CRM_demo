import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

// host: process.env.MYSQL_HOST as string,
const username = process.env.MYSQL_USER as string;
const password = process.env.MYSQL_PASSWORD as string;
const database = process.env.MYSQL_DATABASE as string;

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // sequelize.sync();

export default sequelize;
