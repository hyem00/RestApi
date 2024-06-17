import express from "express";
import PostRouter from "./post.routes.js"; // 확장자를 포함하도록 수정

const router = express.Router();

router.use("/", [PostRouter]);

export { router };
