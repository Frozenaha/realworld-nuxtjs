import { request } from "@/plugins/request";

// 用户登录
export const login = (data) => {
  return request({
    method: "POST",
    url: "/api/users/login",
    data,
  });
};

// 用户注册
export const register = (data) => {
  return request({
    method: "POST",
    url: "/api/users",
    data,
  });
};

// 更新用户
export const updateUser = (data) => {
  return request({
    method: "PUT",
    url: "/api/user",
    data,
  });
};

// 用户信息
export const getUserInfo = (username) => {
  return request({
    method: "GET",
    url: `/api/profiles/${username}`,
  });
};

// 当前用户信息
export const getCurrentUserInfo = () => {
  return request({
    method: "GET",
    url: `/api/user`,
  });
};

// follow user
export const followUser = (username) => {
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`,
  });
};

// unfollow user
export const unFollowUser = (username) => {
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`,
  });
};
