import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEquipmentService } from "../services/equipment.services";
import { uploadEquipmentImgService } from "../services/upload.services";

function FormEditEquipment({ equipmentData }) {
  const redirect = useNavigate();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setName(equipmentData.name);
  }, []);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadEquipmentImgService(uploadData);
      setImgUrl(response.data.equipmentImgUrl);
      setIsUploading(false);
      console.log(imgUrl);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      default:
        setName(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);

      if (imgUrl) {
        await updateEquipmentService(equipmentData._id, {
          ...equipmentData,
          name,
          img: imgUrl,
        });
      } else {
        updateEquipmentService(equipmentData._id, { ...equipmentData, name });
      }
      setIsFetching(false);
      redirect(`/equipment/${equipmentData._id}`);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <img
        src={imgUrl ? imgUrl : equipmentData.img}
        alt="equipment pic"
        width="100"
      />
      <form>
        <label htmlFor="img">Image</label>
        <input
          type="file"
          name="img"
          disabled={isUploading}
          onChange={handleFileUpload}
        />
        <br />
        <br />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleInput} />
        <br />
        <br />
        <button onClick={handleSubmit} disabled={isFetching}>
          UPDATE
        </button>
      </form>
    </>
  );
}

export default FormEditEquipment;
