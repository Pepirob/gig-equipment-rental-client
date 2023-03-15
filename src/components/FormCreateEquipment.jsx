import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createEquipmentService } from "../services/equipment.services";
import { uploadEquipmentImgService } from "../services/upload.services";

function FormCreateEquipment() {
  const DEFAULT_IMG_URL =
    "https://cdn-icons-png.flaticon.com/512/1249/1249374.png";
  const redirect = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEquipment = {
      img: imgUrl,
      name,
      description,
      pricePerDay,
      deposit,
    };

    try {
      setIsFetching(true);
      const response = await createEquipmentService(newEquipment);

      setIsFetching(false);
      redirect(`/equipment/${response.data}`);
    } catch (error) {
      setIsFetching(false);

      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <>
      <img
        src={imgUrl ? imgUrl : DEFAULT_IMG_URL}
        alt="New Equipment pic"
        width="100"
      />

      <form>
        <label htmlFor="img">Upload image</label>
        <input
          type="file"
          name="img"
          disabled={isUploading}
          onChange={handleFileUpload}
        />
        <br />
        <br />
        <label htmlFor="name">Name: </label>
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
        {errorMessage.length ? <p>{errorMessage}</p> : null}
        <button onClick={handleSubmit} disabled={isFetching}>
          PUBLISH
        </button>
      </form>
    </>
  );
}

export default FormCreateEquipment;
