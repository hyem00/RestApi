import express from 'express';
import router from './router.js';
import dotenv from 'dotenv';

import { init } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/', router);

(async () => {
  try {
    const connection = await init();
    app.locals.db = connection; // connection 객체를 app.locals에 저장하여 다른 라우터에서 사용할 수 있게 함

    app.listen(PORT, () => {
      console.log(`${PORT} 서버가 성공적으로 열렸습니다`);
    });
  } catch (err) {
    console.error("server error : ", err);
  }
})();

export default app;