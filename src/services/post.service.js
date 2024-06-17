import PostRepository from "../repositories/post.repository.js";

// 화살표 함수와 일반 함수의 차이 정확히 적재적소에 ..

class PostService {
  _postRepository = new PostRepository();

  // 게시글 작성
  createPost = async (title, content) => {
    try {
      const [result] = await this._postRepository.createPost(
        // userId,
        title,
        content,
      );
      // if (!result) {
      //   return {
      //     status: 400,
      //     message: "게시글 생성 실패",
      //   };
      // }
      return {
        status: 201,
        message: "게시글이 작성되었습니다",
      };
    } catch (error) {
      return { status: 500, message: error };
    }
  };

  // 게시글 전체 조회
  getPosts = async (pageSize, offset) => {
    try {
      const [result] = await this._postRepository.getPosts(pageSize, offset);
      return {
        status: 200,
        message: result,
      };
    } catch (error) {
      return { status: 500, message: error };
    }
  };

  // 게시글 조회
  getPost = async (postId) => {
    const [result] = await this._postRepository.getPost(postId);

    if (result.length > 0) {
      return {
        status: 200,
        message: result[0],
      };
    } else {
      return {
        status: 404,
        message: "해당 게시글이 존재하지 않습니다",
      };
    }
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    const [post] = await this._postRepository.getPost(postId);
    try {
      if (post.length === 0) {
        return {
          status: 404,
          message: "게시글이 존재하지 않습니다.",
        };
      }
      // if (userId !== post.userId) {
      //   return {
      //     status: 401,
      //     message: "수정 권한이 존재하지 않습니다.",
      //   };
      // }
      const result = await this._postRepository.updatePost(
        // userId,
        postId,
        title,
        content,
      );
      if (!result) {
        return {
          status: 400,
          message: "게시글 수정 실패",
        };
      }
      return {
        status: 201,
        message: "게시글 수정 성공",
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: error };
    }
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    const [post] = await this._postRepository.getPost(postId);
    try {
      if (post.length === 0) {
        return {
          status: 404,
          message: "게시글이 존재하지 않습니다.",
        };
      }
      const result = await this._postRepository.deletePost(postId);
      if (!result) {
        return {
          status: 400,
          message: "게시글 삭제 실패",
        };
      }
      return {
        status: 200,
        message: "게시글 삭제 성공",
      };
    } catch (error) {
      return { status: 500, message: error };
    }
  };
}

export default PostService;
