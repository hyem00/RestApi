import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class DBConnector {
  sequelize;
  constructor() {
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    });
  }

  connectDB() {
    this.sequelize
      .sync({ alter: false })
      .then(() => {
        console.log('✨'.repeat(40));
        console.log('Database is Connected 👍');
        console.log('✨'.repeat(40));
      })
      .catch(e => {
        console.error(e);
        throw new Error('Fail to connect..👎');
      });
  }
}

const connector = new DBConnector();
connector.connectDB();

export default connector;
