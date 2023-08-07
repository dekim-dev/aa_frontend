import axios from "axios";
import { API_BASE_URL } from "../app-config";

/** ✨api사용을 위한 call 함수 */
export const call = async (api, method, request) => {
  const config = {
    method: method,
    url: API_BASE_URL + api,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: request, // Request body 데이터
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // 에러 발생 시 처리
    return Promise.reject(error.response.data);
  }
};

export const signup = async (request) => {
  const response = await call("/signup", "POST", request);
  return response;
};

export const signin = async (request) => {
  try {
    const response = await call("/signin", "POST", request);
    return response;
  } catch (error) {
    return error;
  }
};
