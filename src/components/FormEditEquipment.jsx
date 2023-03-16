import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEquipmentService } from "../services/equipment.services";
import { uploadEquipmentImgService } from "../services/upload.services";

function FormEditEquipment({ equipmentData }) {
  const redirect = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [wrongFileMessage, setWrongFileMessage] = useState("");

  useEffect(() => {
    setName(equipmentData.name);
    setDescription(equipmentData.description);
    setPricePerDay(equipmentData.pricePerDay);
    setDeposit(equipmentData.deposit);
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
      setWrongFileMessage("");
    } catch (error) {
      if (error.response.status === 500) {
        setWrongFileMessage("Allowed image formats are .jpeg, .jpg and .png");
        setIsUploading(false);
      } else {
        redirect("/error");
      }
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "pricePerDay":
        setPricePerDay(value);
        break;
      case "deposit":
        setDeposit(value);
        break;
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
          name,
          description,
          pricePerDay,
          deposit,
          img: imgUrl,
        });
      } else {
        updateEquipmentService(equipmentData._id, {
          name,
          description,
          pricePerDay,
          deposit,
        });
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
        alt={`A pic of ${equipmentData.name}`}
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
        {wrongFileMessage && <p>{wrongFileMessage}</p>}
        <br />
        <br />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleInput} />
        <br />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          type="textarea"
          name="description"
          value={description}
          onChange={handleInput}
        />
        <br />
        <br />
        <label htmlFor="pricePerDay">Price per Day: </label>
        <input
          min={0}
          type="number"
          name="pricePerDay"
          value={pricePerDay}
          onChange={handleInput}
        />
        <br />
        <br />
        <label htmlFor="deposit">Deposit: </label>
        <input
          min={0}
          type="number"
          name="deposit"
          value={deposit}
          onChange={handleInput}
        />
        <br />
        <br />
        <button
          onClick={handleSubmit}
          disabled={isUploading || wrongFileMessage || isFetching}
        >
          UPDATE
        </button>
      </form>
    </>
  );
}

export default FormEditEquipment;
