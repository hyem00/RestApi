import http from 'k6/http';
import { check, sleep } from 'k6';

// 성능(부하) 테스트 k6 https://k6.io/docs/get-started/installation/ 
// k6 run script.js --out json=test.json 

export const options = {
  vus: 10, // 몇명이 동시에 
  duration: '30s', // 지속시간 (얼마나)
};

const BASE_URL = 'http://localhost:8000';

// 게시글 작성 테스트
function createPost() {
  const payload = JSON.stringify({
    title: `랜덤 테스트 제목 ${Math.random()}`,
    content: '테스트 내용',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`${BASE_URL}/posts`, payload, params);
  check(res, { '게시물 작성 성공': (r) => r.status === 201 });

  return res.json().id;
}

// 게시물 조회 테스트
function getPost(postId) {
  const res = http.get(`${BASE_URL}/posts/${postId}`);
  check(res, { '게시물 조회 성공': (r) => r.status === 200 });
}

// 게시물 수정 테스트
function updatePost(postId) {
  const payload = JSON.stringify({
    title: `수정된 랜덤제목 ${Math.random()}`,
    content: '수정된 내용',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.put(`${BASE_URL}/posts/${postId}`, payload, params);
  check(res, { '게시물 수정 성공': (r) => r.status === 200 });
}

// 게시물 삭제 테스트
function deletePost(postId) {
  const res = http.del(`${BASE_URL}/posts/${postId}`);
  check(res, { '게시물 삭제 성공': (r) => r.status === 200 });
}

// 가상 사용자마다 반복적으로 실행 (병렬)
export default function () {
  // 게시물 작성 -> 조회 -> 수정 -> 삭제 테스트
  const postId = createPost();
  getPost(postId);
  updatePost(postId);
  deletePost(postId);

  sleep(1); // 각 가상 사용자 간의 대기 시간
}