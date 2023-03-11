import service from "./config.services";

const getUserService = (userId) => service.get(`/user/${userId}`);

export { getUserService };
