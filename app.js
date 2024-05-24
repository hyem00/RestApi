import express from 'express';
import router from './router.js';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(` ${PORT} 서버 가동중 `);
  });
  
export default app;