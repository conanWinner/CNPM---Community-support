const URL = 'http://localhost:8080';
// const URL = "https://community-support-project.onrender.com";

// =============== USER ====================
export const getUsers = URL + '/api/users'; // Get all users
export const getUser = URL + '/api/users'; // Get a user
export const postUser = URL + '/api/users'; // Post a user     => Register user

// ================== ORG ==================
export const postORG = URL + '/api/organization'; // Post a organization     => Register organization

// =============== AUTH ====================
export const ADMIN_ROLE = 'ADMIN';
export const USER_ROLE = 'USER';
export const login = URL + '/api/auth/login'; // Login

// =================== URL index =======================
export const URLIndex = './index.html';

export const uploadImage = URL + '/api/files/images'; // Upload image
