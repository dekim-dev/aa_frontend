import { call } from "./ApiService";

// ✨ 회원 관리

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

// ✨ 병원 관리

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

// ✨ 광고 관리

export const allAds = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/advertisement?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const registerAd = async (newAd) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/advertisement`, "POST", newAd, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAd = async (adId, updatedAd) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/advertisement/${adId}`,
      "PATCH",
      updatedAd,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteMultipleAds = async (adIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/advertisement`, "DELETE", adIds, token);
    return response;
  } catch (error) {
    return error;
  }
};
