const host = "http://localhost:3001";

//login
export const registerUser = host + "/auth/register";
export const loginUser = host + "/auth/login";

//node
export const getAllNodes = host + "/nodes/all";
export const getAllRelays = host + "/nodes/allrelay";
export const addNode = host + "/nodes/addnode/";
export const nodeApi = host + "/nodes/";
export const editNode = host + "/nodes/edit/";

//home
export const getAllHomes = host + "/homes/all/";
export const getHome = host + "/homes/";
export const addHome = host + "/homes/addhome/";
export const linkHome = host + "/homes";
export const unLinkHome = host + "/homes/unlink";

//rooms
export const getAllRooms = host + "/rooms/all/";
export const addRoom = host + "/rooms/addroom";
export const roomApi = host + "/rooms/";
export const linkRoom = host + "/rooms/linkroom";
export const updateRoom = host + "/rooms";

//devices
export const getAllDevices = host + "/devices/all/";
export const addDevice = host + "/devices/adddevice";
export const linkDevice = host + "/devices/linkdevice";
export const deviceApi = host + "/devices/";
export const updateDevice = host + "/devices";
export const disconnectRelay = host + "/devices/disconnect";
export const linkButtonApi = host + "/devices/linkbutton";
export const disconnectButtonApi = host + "/devices/disconnectbutton";
export const editDevice = host + "/devices/edit/";

//get information relayADE
export const inforADE = host + "/ades/";
export const inforSensor = host + "/sensor/";

//img http://localhost:3001/assets/
export const getImg = `http://localhost:3001/assets/`;
