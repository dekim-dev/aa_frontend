import axios from "axios";
import { API_BASE_URL } from "../app-config";
import { dateFormatWithDash } from "../utils/Functions";

/** ✨api사용을 위한 call 함수 */
export const call = async (api, method, request) => {
  let token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    // 토큰이 없을 경우 로그인 필요
    alert("로그인이 필요합니다.");
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
        const newAccessToken = await refreshToken();

        // 새로운 액세스 토큰으로 요청 재시도
        const newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        const response = await axios(newConfig);
        return response.data;
      } catch (refreshError) {
        throw refreshError;
      }
    }

    // 다른 에러 처리
    return Promise.reject(error.response);
  }
};

// 회원가입
export const signup = async (request) => {
  try {
    const response = await axios.post(API_BASE_URL + "/auth/signup", request); // 토큰 없이 요청 보내기
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// 로그인
export const signin = async (request) => {
  try {
    const response = await axios.post(API_BASE_URL + "/auth/login", request);
    const token = response.data.accessToken; // 서버 응답에서 토큰 추출
    localStorage.setItem("ACCESS_TOKEN", `${token}`); // 토큰 저장
    localStorage.setItem("REFRESH_TOKEN", `${response.data.refreshToken}`);
    console.log("📌accessToken: " + token);
    console.log("📌refreshToken: " + response.data.refreshToken);
    console.log("✔ 로그인 완료");
    return response;
  } catch (error) {
    return error;
  }
};

// 로그아웃
export const logout = async (requestBody) => {
  try {
    // 로그아웃 API 엔드포인트 호출
    await axios.post(API_BASE_URL + "/auth/logout", requestBody);
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw error;
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

// 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
export const refreshToken = async () => {
  try {
    const response = await axios.post(API_BASE_URL + "/auth/reissue", {
      refreshToken: localStorage.getItem("REFRESH_TOKEN"),
      accessToken: localStorage.getItem("ACCESS_TOKEN"),
    });
    const newAccessToken = response.data.accessToken; // 새로운 액세스 토큰
    console.log("✨newAccessToken: " + newAccessToken);

    // 새로운 액세스 토큰을 로컬 스토리지에 저장
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
    console.log("글쓰기 토큰: ", token);
    const response = await call(`/post`, "POST", requestData, token);
    console.log("글쓰기 반환: ", response);
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 리스트
export const getClinicList = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/list?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 키워드로 검색
export const getClinicListByKeyword = async (keyword, page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 디테일 정보
export const getClinicInfoById = async (id) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/clinics/${id}`, "GET", null, token);
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 주소로 검색
export const getClinicListByAddress = async (address, page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/searchAddress?address=${address}&page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Todo 아이템 생성
export const createTodoItem = async (todoItemDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/todo-item", "POST", todoItemDTO, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 날짜에 해당하는 Todo 아이템 목록 조회
export const getTodoItemsByDate = async (date) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/todo-item/items?date=${dateFormatWithDash(date)}`,
      "GET",
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Todo 아이템 삭제
export const deleteTodoItem = async (itemId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/todo-item/${itemId}`, "DELETE", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// Todo 아이템 상태 업데이트
export const updateTodoItemStatus = async (itemId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/todo-item/${itemId}`, "PUT", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 게시판별로 글 불러오기
export const getPostsByBoardCategory = async (
  page,
  pageSize,
  boardCategory
) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/category/${boardCategory}?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 생성
export const createDiary = async (diary) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/diary", "POST", diary, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 조회
export const getDiaryList = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/diary", "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 정보 조회 (UserContext저장용)
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/main/userInfo", "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 글 수정
export const updatePost = async (requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/edit`, "PUT", requestData, token);
    console.log("글수정 성공: ", response);
    return response;
  } catch (error) {
    console.log("글수정 실패: ", error);
    return error;
  }
};

// 글 삭제
export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/delete?postId=${postId}`,
      "DELETE",
      token
    );
    console.log("글삭제 성공: ", response);
    return response;
  } catch (error) {
    console.log("글삭제 실패: ", error);
    return error;
  }
};

// 조회수 증가
export const increaseViewCount = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/view-count?postId=${postId}`,
      "PUT",
      token
    );
    console.log("조회수 증가 성공: ", response);
    return response;
  } catch (error) {
    console.log("조회수 증가 실패: ", error);
    return error;
  }
};

// 좋아요 클릭
export const createDeleteLikes = async (likesDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/likes`, "POST", likesDTO, token);
    console.log("좋아요 api 성공: ", response);
    return response;
  } catch (error) {
    console.log("좋아요 api 실패: ", error);
    return error;
  }
};

//댓글 작성
export const createComment = async (requestData, postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/${postId}/comment`,
      "POST",
      requestData,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

//댓글 수정
export const updateComment = async (commentId, requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/${commentId}/comment`,
      "PUT",
      requestData,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

//댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/${commentId}/comment`, "DELETE", token);
    return response;
  } catch (error) {
    return error;
  }
};
