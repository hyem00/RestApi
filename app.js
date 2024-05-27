import express from 'express';
import router from './router.js';
import dotenv from 'dotenv';
import connector from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/', router);

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} 서버가 성공적으로 열렸습니다`);
    });
    connector.connectDB();
  } catch (err) {
    console.error("server error : ", err);
  }
})();
  

export default app;