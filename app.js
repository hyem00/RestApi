import express from "express";
import { router } from "./src/routes/index.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "test",
});

app.use(express.json());
app.use("/", router);

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} 서버가 성공적으로 열렸습니다`);
    });
  } catch (err) {
    console.error("server error : ", err);
  }
})();

export { connection };
export default app;

// Q1. 파일 구조 하나의 api 관련을 모아두기 vs 역할별로 모아두기
// Q2. 예전에는 import하기 편하려고 index에 다 써놓았었는데 이게 개발적으로 좋아보이지 않습니다 맞을까요?
// Q3. 아.. 함수형vs 클래스형 조직/모둘화 재사용성/확장성 의존성 주입이 쉬운 패턴 , (내부동작,상태를)캡슐화 - 외부에서 직접 접근 불가 !! 단일책임원칙
// Q4. validator 를 springboot 처럼 만들어보려고 했는데 . . 라이브러리가 있어요 .... 우선 막 사용하기보다는 로컬로 만들어보기 도전
