import service from "./config.services";

const uploadEquipmentImgService = (img) => {
  return service.post("/upload/equipmentImg", img);
};

const uploadUserImgService = (img) => {
  return service.post("/upload/userImg", img);
};

export { uploadUserImgService, uploadEquipmentImgService };
