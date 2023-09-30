import { call } from "./ApiService";

export const allUserInfo = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/users`, "GET", null, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateUserInfo = async (userInfoAllDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/users`, "PUT", userInfoAllDTO, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteMultipleUsers = async (userIdList) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/users`, "DELETE", userIdList, token);
    return response;
  } catch (error) {
    return error;
  }
};
