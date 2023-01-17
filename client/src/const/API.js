const host = "http://localhost:3001";

//login
export const registerUser = host + "/auth/register";
export const loginUser = host + "/auth/login";

//node
export const getAllNodes = host + "/nodes/all";
export const addNode = host + "/nodes/addnode";

//home
export const getAllHomes = host + "/homes/all/";
export const getHome = host + "/homes/";
export const addHome = host + "/homes/addhome/";

//img http://localhost:3001/assets/
export const getImg = `http://localhost:3001/assets/`;
