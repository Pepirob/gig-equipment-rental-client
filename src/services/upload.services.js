import service from "./config.services";

const uploadEquipmentImgService = (img) =>
  service.post("/upload/equipmentImg", img);

const uploadUserImgService = (img) => service.post("/upload/userImg", img);

export { uploadUserImgService, uploadEquipmentImgService };
