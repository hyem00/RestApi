import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// mysql 버전으로 인한 보안 에러, mysql2로 업데이트
const  database = {
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };


  export async function init() {
    try {
      const connection = await mysql.createConnection(database);
      console.log("mysql db가 성공적으로 연결되었습니다");
      return connection;
    } catch (err) {
      console.error("mysql connection error: " + err);
      throw err;
    }
  }