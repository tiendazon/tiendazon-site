import jwt_decode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiURL = config.apiURL;
const tokenProperty = "token";

http.setToken(getToken());

async function login(user) {
  const response = await http.post(apiURL + "/auths", user);
  const token = response.headers["x-auth-token"];
  localStorage.setItem(tokenProperty, token);
  http.setToken(getToken());

  return jwt_decode(token);
}

function loginWithToken(token) {
  localStorage.setItem(tokenProperty, token);
  http.setToken(getToken());

  return jwt_decode(token);
}

function logout() {
  localStorage.removeItem(tokenProperty);
}

async function register(user) {
  const response = await http.post(apiURL + "/users", user);
  const token = response.headers["x-auth-token"];
  localStorage.setItem(tokenProperty, token);

  http.setToken(getToken());

  return token;
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenProperty);
    return jwt_decode(token);
  } catch (ex) {
    return null;
  }
}

function getToken() {
  const token = localStorage.getItem(tokenProperty);
  if (!token) return null;

  return token;
}

export default {
  login,
  loginWithToken,
  logout,
  getCurrentUser,
  register,
};
