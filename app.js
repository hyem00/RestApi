import express from 'express';
import router from './router.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 아우 넘 졸려여 . . . https://sidorares.github.io/node-mysql2/docs

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password : process.env.DB_PASS ,
  port : process.env.DB_PORT || 3306 ,
  database: process.env.DB_NAME || 'test',
});


app.use(express.json());
app.use('/', router);

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} 서버가 성공적으로 열렸습니다`);
    });
  
  } catch (err) {
    console.error("server error : ", err);
  }
})();
  

export default app;