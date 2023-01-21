const host = "http://localhost:3001";

//login
export const registerUser = host + "/auth/register";
export const loginUser = host + "/auth/login";

//node
export const getAllNodes = host + "/nodes/all";
export const getAllRelays = host + "/nodes/allrelay";
export const addNode = host + "/nodes/addnode/";

//home
export const getAllHomes = host + "/homes/all/";
export const getHome = host + "/homes/";
export const addHome = host + "/homes/addhome/";

//rooms
export const getAllRooms = host + "/rooms/all/";
export const addRoom = host + "/rooms/addroom";
export const roomApi = host + "/rooms/";

//img http://localhost:3001/assets/
export const getImg = `http://localhost:3001/assets/`;
