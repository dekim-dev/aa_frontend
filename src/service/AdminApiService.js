import { call } from "./ApiService";

export const allUserInfo = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/users?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
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

export const registerClinic = async (clinicDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/clinic`, "POST", clinicDTO, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateClinicInfo = async (clinicId, clinicDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/clinic/${clinicId}`,
      "PUT",
      clinicDTO,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteMultipleClinics = async (clinicIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/clinic`, "DELETE", clinicIds, token);
    return response;
  } catch (error) {
    return error;
  }
};
