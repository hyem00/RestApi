import { connection } from "../../app.js";

class PostRepository {
  // 게시글 생성
  createPost = async (title, content) => {
    return await connection.execute(
      "INSERT INTO posts (title, content) VALUES (?, ?)",
      [title, content],
    );
  };

  // 게시글 전체 조회
  getPosts = async (pageSize, offset) => {
    return await connection.execute(
      `SELECT * FROM posts LIMIT ${pageSize} OFFSET ${offset}`,
    );
  };

  // 게시글 조회
  getPost = async (postId) => {
    return await connection.execute("SELECT * FROM posts WHERE id = ?", [
      postId,
    ]);
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    return await connection.execute(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?",
      [title, content, postId],
    );
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    return await connection.execute("DELETE FROM posts WHERE id = ?", [postId]);
  };
}

export default PostRepository;
