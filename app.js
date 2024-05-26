import express from 'express';
import router from './router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/', router);

// 기존까지는 생각없이 인터넷에 있는 코드연결방식을 사용했는데 . .
// 시퀄라이즈때문에 mysql2  쓰는지 알았는데 promise 지원을 안해서 라고 한다
// Q1 : 디비연결까지 비동기여야할 이유 ??
// 사실 시퀄라이즈 없이 db만 쓰진 않을것 같아서 그렇게 해본적이 없는데 .. 
// 공식문서 보니까 
// connection.query('SELECT 1', function (error, results, fields) {
//   if (error) throw error;
// });
// 이러고 있다 ... 뭐지 
// TODO : orm 적용시키기 

// sequlize-auto
// 간편하게 하려고 이거 써보려고 했는데 . .대 실 패 
// Q2 : 안좋은 방법인가요 .. 이미 만들어진 데이터베이스가 있으면 좋은 라이브러리라는데 .. ㅠㅠ

// Q3 : 뭐든 자동 완성되는 그런거 init 이나 .. 그런거 사용하면 다 CommonJS 로 되는이유

// Q4 : 아니 제이슨이 안읽히는 이유 ,.. 결국 해결 못함 ㅠㅠ

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