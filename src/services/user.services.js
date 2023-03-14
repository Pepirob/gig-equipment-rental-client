import service from "./config.services";

const getUserService = (userId) => service.get(`/user/${userId}`);

const updateUserService = (userId, body) => {
  return service.patch(`/user/${userId}`, body);
};

const deleteUserService = (userId) => {
  return service.delete(`/user/${userId}`);
};

export { getUserService, updateUserService, deleteUserService };
