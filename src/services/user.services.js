import service from "./config.services";

const getUserService = (userId) => service.get(`/user/${userId}`);

const updateUserService = (userId, body) =>
  service.patch(`/user/${userId}`, body);

const deleteUserService = (userId) => {
  service.delete(`/user/${userId}`);
};

export { getUserService, updateUserService, deleteUserService };
