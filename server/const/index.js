export const permitJoin = {
  action: "command",
  command: "permit_join",
};

export const leaveRequest = {
  action: "command",
  command: "leave_req",
  dev_addr: "",
};

export const controlRelay = {
  action: "control",
  dev_addr: "",
  status: "ON",
};