import { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateEquipmentService } from "../services/equipment.services";
import { uploadEquipmentImgService } from "../services/upload.services";
import { capitalize } from "../utils/index";
import ImageStyles from "./ImageStyles";

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
    setName(capitalize(equipmentData.name));
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

  const basicData = { name, description, pricePerDay, deposit };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);

      if (imgUrl) {
        await updateEquipmentService(equipmentData._id, {
          ...basicData,
          img: imgUrl,
        });
      } else {
        updateEquipmentService(equipmentData._id, {
          ...basicData,
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
      <ImageStyles>
        <Image
          thumbnail={true}
          src={imgUrl ? imgUrl : equipmentData.img}
          alt={`A pic of ${equipmentData.name}`}
        />
      </ImageStyles>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="img">Image</Form.Label>
          <Form.Control
            type="file"
            name="img"
            disabled={isUploading}
            onChange={handleFileUpload}
          />
        </Form.Group>
        {wrongFileMessage && <p>{wrongFileMessage}</p>}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description: </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={description}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="pricePerDay">Price per Day: </Form.Label>
          <Form.Control
            min={0}
            type="number"
            name="pricePerDay"
            value={pricePerDay}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="deposit">Deposit: </Form.Label>
          <Form.Control
            min={0}
            type="number"
            name="deposit"
            value={deposit}
            onChange={handleInput}
          />
        </Form.Group>

        <Button
          variant="success"
          size="lg"
          onClick={handleSubmit}
          disabled={isUploading || wrongFileMessage || isFetching}
        >
          UPDATE
        </Button>
      </Form>
    </>
  );
}

export default FormEditEquipment;
