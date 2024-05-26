import express from 'express';

// TODO 
// DB 연결하기 (시간나면 rds 였나 그 뭐시기 알지 그거까지 연결해서 사용해보기)
// 시퀄라이즈 연결하기 
// 페이지네이션 디비 나누기 = 토탈 페이지 갯수 그거 구현해줘야함 
// 에러핸들링 추가하기 
// 생성 삭제 조회 및 레포 연결해서 사용하기

const router = express.Router();

// 전체페이지 리스트 조회
router.get('/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1; // 현재 페이지 번호
    const pageSize = parseInt(req.query.pageSize) || 10; // 페이지당 게시물 수
    const startIndex = (page - 1) * pageSize; // 페이지의 시작 인덱스
    const endIndex = page * pageSize; // 페이지의 끝 인덱스

    // if(){
    //     res.status(400).json({errorMeseage : "해당 페이지가 존재하지 않습니다."})
    // }

    if(posts.length === 0){
       res.status(404).json({meseage : "게시글이 존재하지 않습니다."})
    }
    const totalPages = Math.ceil(posts.length / pageSize); // 전체 페이지 수
    // if(!page || !pageSize){
    //     return res
    //   .status(400)
    //   .json({ message: "페이지를 입력해주세요." });
    // }
    
    const results = {};
    if (endIndex < posts.length) {
        results.next = {
            page: page + 1,
            pageSize: pageSize
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            pageSize: pageSize
        };
    }
    results.totalPages = totalPages;
    results.currentPage = page;
    results.posts = posts.slice(startIndex, endIndex);

    res.json(results);
});

// 게시물 상세페이지 조회
router.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {
        res.status(404).json({meseage:"게시물을 찾을 수 없습니다."});
    } else {
        res.json(post);
    }
});

// 게시물 생성
router.post('/posts', async (req, res) => {
    const { title, content } = req.body;

    // 입력 유효성 검사
    if (!title || !content) {
        return res.status(400).json({ message: "게시물 제목과 내용을 모두 입력해주세요." });
    }

    try {
        // TODO : 그냥 디비 만들어서 생성해버리자 ~~
        // const id = posts.length + 1;
        // const newPost = { id, title, content };
        // posts.push(newPost);
        // const newPost = new posts({ title, content });
        // await newPost.save();
        // res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 게시물 수정
router.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = posts.find(post => post.id === id);
    if (!post) {
        res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    } else {
        if (!title || !content) {
            res.status(400).json({ message: '게시물 제목과 내용을 모두 입력해주세요.' });
        } else {
            post.title = title;
            post.content = content;
            res.status(200).json(post);
        }
    }
});

// 게시물 삭제
router.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
        res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    } else {
        posts.splice(index, 1);
        res.status(204).send();
    }
});

export default router;