const URL = 'http://localhost:8090';
// const URL = "https://community-support-project.onrender.com";

// =================== URL front-end =======================
export const URLIndex = './index.html';
export const URLchitietlachualanh = './chitietlachualanh.html';
export const URLDetailContribution = "./detail-contribution.html";

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

// =================== Form ===========================
export const uploadImage = URL + '/api/files/images'; // Upload image
export const formAPI = URL + '/api/forms';
export const confirmFormAPI = URL + "/api/forms/{formId}/organization/{organizationId}";
export const getFormByOrganizationAPI = URL + "/api/forms/organization/{organizationId}";
export const provice_url = 'https://api.npoint.io/ac646cb54b295b9555be';
export const district_url = 'https://api.npoint.io/34608ea16bebc5cffd42';
export const ward_url = 'https://api.npoint.io/dd278dc276e65c68cdf5';

// ================ Contributions =================
export const contributionsAPI = URL + "/api/contributions";
export const getContributionsAPI = URL + "/api/contributions/{formId}";

//  ================== Spending ===================
export const spendingAPI = URL + "/api/forms/spending/{formId}";
