import axios from "axios";
import { API_BASE_URL } from "../app-config";

/** ✨api사용을 위한 call 함수 */
export const call = async (api, method, request) => {
  let token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    // 토큰이 없을 경우 로그인 필요
    throw new Error("로그인이 필요합니다.");
  }

  const config = {
    method: method,
    url: API_BASE_URL + api,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    data: request,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // 토큰 만료 또는 유효하지 않은 경우
    if (error.response && error.response.status === 401) {
      try {
        // refreshToken 호출하여 새로운 액세스 토큰 발급
        const newAccessToken = await refreshToken(token);
        console.log(error);

        // 새로운 액세스 토큰으로 요청 재시도
        const response = await axios({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return response.data;
      } catch (refreshError) {
        throw refreshError;
      }
    }

    // 다른 에러 처리
    return Promise.reject(error.response.data);
  }
};

// 회원가입
export const signup = async (request) => {
  try {
    const response = await axios.post(API_BASE_URL + "/signup", request); // 토큰 없이 요청 보내기
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// 로그인
export const signin = async (request) => {
  try {
    const response = await axios.post(API_BASE_URL + "/signin", request);
    const token = response.data.accessToken; // 서버 응답에서 토큰 추출
    localStorage.setItem("ACCESS_TOKEN", `${token}`); // 토큰 저장
    window.location.replace("/"); // 임시로 새로고침
    console.log("✔ 로그인 완료");
    return response;
  } catch (error) {
    return error;
  }
};

// 프론트엔드에서의 OPTIONS 요청에 대한 처리
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.config.method === "options"
    ) {
      // OPTIONS 요청에 대한 응답 처리
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

// 📌리프레시 토큰.. 보류
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(API_BASE_URL + "/api/refresh-token", {
      refreshToken: refreshToken,
    });
    const newAccessToken = response.data; // 새로운 액세스 토큰

    // 새로운 액세스 토큰을 로컬 스토리지에 저장 또는 관리
    localStorage.setItem("ACCESS_TOKEN", newAccessToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// 번호로 게시글 가져오기
export const post = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/${postId}`, "GET", null, token);
    return response;
  } catch (error) {
    return error;
  }
};

// 글쓰기
export const createPost = async (requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/`, "POST", requestData, token);
    return response;
  } catch (error) {
    return error;
  }
};
