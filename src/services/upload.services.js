import service from "./config.services";

const uploadUserImgService = (img) => service.post("/upload/userImg", img);

export { uploadUserImgService };
