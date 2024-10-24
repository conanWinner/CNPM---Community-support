// const URL = "http://localhost:8080";
const URL = "http://localhost:8090";

// =============== USER ====================
export const getUsers = URL + "/api/users"; // Get all users
export const getUser = URL + "/api/users"; // Get a user
export const postUser = URL + "/api/users"; // Post a user

// =============== AUTH ====================
export const ADMIN_ROLE = "ADMIN";
export const USER_ROLE = "USER";
export const login = URL + "/api/auth/login"; // Login
