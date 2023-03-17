import { useState } from "react";
import { useNavigate } from "react-router";
import { createEquipmentService } from "../services/equipment.services";
import { uploadEquipmentImgService } from "../services/upload.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FloatingLabel, Image } from "react-bootstrap";
import ImageStyles from "./ImageStyles";

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
  const [wrongFileMessage, setWrongFileMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getImgUrl = () => (imgUrl ? imgUrl : DEFAULT_IMG_URL);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEquipment = {
      img: getImgUrl(),
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
      <ImageStyles>
        <Image thumbnail={true} src={getImgUrl()} alt="New Equipment pic" />
      </ImageStyles>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="img">Upload image</Form.Label>
          <Form.Control
            type="file"
            name="img"
            disabled={isUploading}
            onChange={handleFileUpload}
          />
        </Form.Group>
        {wrongFileMessage && <p>{wrongFileMessage}</p>}
        {isUploading ? <h3>... uploading image</h3> : null}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Description: </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={description}
            onChange={handleInput}
            style={{ height: "100px" }}
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

        {errorMessage && <p>{errorMessage}</p>}
        <Button
          variant="success"
          size="lg"
          onClick={handleSubmit}
          disabled={isUploading || wrongFileMessage || isFetching}
        >
          PUBLISH
        </Button>
      </Form>
    </>
  );
}

export default FormCreateEquipment;
