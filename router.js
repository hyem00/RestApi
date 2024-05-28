import express from 'express';

// TODO 
// 인풋으로 들어오는 데이터 검증 그거 해보기 
// 생성 수정 삭제 날짜 만들어서 소프트 딜리트 노드로도 해보기
// orm 없이 구현해보기


const router = express.Router();

// // 전체페이지 리스트 조회
// router.get('/posts', async(req, res) => {
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
//     try {
//         const offset = (page - 1) * pageSize;
//         const posts = await Post.findAll({
//           offset: offset,
//           limit: pageSize,
//           // order: [['createdAt', 'DESC']] 추후 추가
//         });
//         if (posts.ength === 0){
//             res.status(404).json({message:"게시물이 존재하지 않습니다"});
//         }
//         res.json(posts);
//     } catch (error) {
//       res.status(500).json({message: error.message });
//     }
// });

// // 게시물 상세페이지 조회
// router.get('/posts/:id', async(req, res) => {
//     const id = parseInt(req.params.id);
//     const post = await Post.findByPk(id)
//     if (!post) {
//         res.status(404).json({meseage:"게시물을 찾을 수 없습니다."});
//     } else {
//         res.json(post);
//     }
// });

// // 게시물 생성
// router.post('/posts', async (req, res) => {
//     const { title, content } = req.body;
//     if (!title || !content) {
//         return res.status(400).json({ message: "게시물 제목과 내용을 모두 입력해주세요." });
//     }

//     try {
//         const newPost = await Post.create({
//             title: title,
//             content: content,
//         });
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 게시물 수정
// router.put('/posts/:id', async(req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, content } = req.body;

//     if (!title || !content) {
//         res.status(400).json({ message: '게시물 제목과 내용을 모두 입력해주세요.' });
//     } 
    
//     try {
//         const post = await Post.findByPk(id);

//         if (!post) {
//             return res.status(404).json({ message: '해당 게시물이 존재하지 않습니다.' });
//         }

//         post.title = title;
//         post.content = content;
//         await post.save();

//         res.json(post);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
    
// });

// // 게시물 삭제
// router.delete('/posts/:id', async(req, res) => {
//     const id = parseInt(req.params.id);
  
//     try {
//         const post = await Post.findByPk(id);

//         if (!post) {
//             return res.status(404).json({ message: '해당 게시물이 존재하지 않습니다.' });
//         }

//         // 게시물 삭제
//         await post.destroy();
//         res.json({ message: '게시물이 성공적으로 삭제되었습니다.' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

export default router;

