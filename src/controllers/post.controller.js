import PostService from "../services/post.service.js";

class PostController {
  _postService = new PostService();

  createPost = async (req, res) => {
    const { title, content } = req.body;

    // if (!title || !content) {
    //   return res
    //     .status(400)
    //     .json({ message: "게시물 제목과 내용을 모두 입력해주세요." });
    // }  => TODO 알지오매스 할때처럼 한번에 모아서 처리하는거 만들어보기
    const result = await this._postService.createPost(title, content);
    return res.status(result.status).json(result.message);
  };

  getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const result = await this._postService.getPosts(pageSize, offset);
    return res.status(result.status).json(result.message);
  };

  getPost = async (req, res) => {
    const { postId } = req.params;
    const result = await this._postService.getPost(postId);
    return res.status(result.status).json(result.message);
  };

  updatePost = async (req, res) => {
    // const userId = res.locals.userId;
    const { postId } = req.params;
    const { title, content } = req.body;

    const result = await this._postService.updatePost(
      // userId,
      postId,
      title,
      content,
    );
    return res.status(result.status).json(result.message);
  };

  deletePost = async (req, res) => {
    // const userId = res.locals.userId;
    const { postId } = req.params;

    // const result = await this._postService.deletePost(userId, postId);
    const result = await this._postService.deletePost(postId);

    return res.status(result.status).json(result.message);
  };
}

export default PostController;
