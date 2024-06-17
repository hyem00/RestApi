import { Router } from "express";

import PostController from "../controllers/post.controller.js";
// import isAuth from "../middlewares/auth.middleware";

const router = Router();

// 클래스 가져와서 인스턴스 만드는방식
const postController = new PostController();

// 게시글 작성
router.post("/posts", postController.createPost);
// 게시글 리스트 조회
router.get("/posts", postController.getPosts);
// 게시글 조회
router.get("/posts/:postId", postController.getPost);
// 게시글 수정
router.put("/posts/:postId", postController.updatePost);
// 게시글 삭제
router.delete("/posts/:postId", postController.deletePost);

// // 게시글 작성
// router.post("/post", isAuth, postController.createPost);
// // 게시글 리스트 조회
// router.get("/posts", postController.getPosts);
// // 게시글 조회
// router.get("/posts/:postId", postController.getPost);
// // 게시글 수정
// router.put("/posts/:postId", isAuth, postController.updatePost);
// // 게시글 삭제
// router.delete("/posts/:postId", isAuth, postController.deletePost);

export default router;
