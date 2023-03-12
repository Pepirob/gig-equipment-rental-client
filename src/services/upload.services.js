import service from "./config.services";

const uploadEquipmentImgService = (img) =>
  service.post("/upload/equipmentImg", img);

export { uploadEquipmentImgService };
