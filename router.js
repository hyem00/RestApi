import express from 'express';
import {connection} from './app.js'

// TODO 
// 인풋으로 들어오는 데이터 검증 그거 해보기 
// 생성 수정 삭제 날짜 만들어서 소프트 딜리트 노드로도 해보기
// orm 없이 구현해보기


const router = express.Router();

// // 전체페이지 리스트 조회
router.get('/posts', async(req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    try {
        const [posts] = await connection.execute(
            `SELECT * FROM posts LIMIT ${pageSize} OFFSET ${offset}`
        );
        
        if (posts.length === 0) {
            return res.status(404).json({ message: "게시물이 존재하지 않습니다" });
        }

        const [totalCount] = await connection.execute('SELECT COUNT(*) as count FROM posts');
        const totalPosts = totalCount[0].count;

        res.json({
            posts: posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / pageSize),
            totalPosts: totalPosts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 게시물 상세페이지 조회
router.get('/posts/:id', async(req, res) => {
    const { id } = req.params;
    try {
      const [post] = await connection.execute('SELECT * FROM posts WHERE id = ?', [id]);
      if (post.length === 0) {
        return res.status(404).json({ error: '해당 게시물이 존재하지 않습니다.' });
      }
      res.json(post[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// 게시물 생성
router.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "게시물 제목과 내용을 모두 입력해주세요." });
    }

    try {
        const [result] = await connection.execute(
            'INSERT INTO posts (title, content) VALUES (?, ?)',
            [title, content]
          );
     
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 게시물 수정
router.put('/posts/:id', async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400).json({ message: '게시물 제목과 내용을 모두 입력해주세요.' });
    } 
    
    try {
        const [post] = await connection.execute(
            `select * from posts where id = ?` ,
            [id]
        )

        if (post.length ===0) {
            return res.status(404).json({ message: '해당 게시물이 존재하지 않습니다.' });
        }

        await connection.execute(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
          );

        // Q1 : 이거 수정이나 생성의 결과물을 항상 다시 조회해서 리턴해야하는가 ... ? -> 혼자 답 ! 마자요 ! 
        const [updatedPost] = await connection.execute(
            'SELECT * FROM posts WHERE id = ?',
            [id]
          );
        res.json(updatedPost[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});

// 게시물 삭제
router.delete('/posts/:id', async(req, res) => {
    const { id } = req.params;
  
    try {
        const [post] = await connection.execute(
            `select * from posts where id = ?` ,
            [id]
        )
        if(post.length ===0){
            res.status(404).json({message : "해당 게시글이 존재하지 않습니다."})
        }
        await connection.execute('DELETE FROM posts WHERE id = ?', [id]);
        // 삭제는 이렇게 응답을 끝내는 경우도 있다고 함
        // res.status(204).end();
        res.json({message : "성공적으로 삭제되었습니다."})
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

export default router;

