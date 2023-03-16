import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserService } from "../services/user.services";
import { uploadUserImgService } from "../services/upload.services";
import { capitalize } from "../utils";

function FormProfileEdit({ userData }) {
  const redirect = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [wrongFileMessage, setWrongFileMessage] = useState("");

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
    setLocation(capitalize(userData.location));
    setPhoneNumber(userData.phoneNumber);
  }, []);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadUserImgService(uploadData);

      setImgUrl(response.data.userImgUrl);
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
      case "email":
        setEmail(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        setUsername(value);
    }
  };

  const basicUserData = {
    email,
    username,
    location,
    phoneNumber,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);

      if (imgUrl) {
        await updateUserService(userData._id, {
          ...userData,
          ...basicUserData,
          img: imgUrl,
        });
      } else {
        await updateUserService(userData._id, {
          ...userData,
          ...basicUserData,
        });
      }

      setIsFetching(false);
      redirect("/profile");
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <img
        src={imgUrl ? imgUrl : userData.img}
        alt={`A pic of ${userData.name}`}
        width={200}
      />
      <form>
        <label>Image: </label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <br />
        <br />
        {wrongFileMessage && <p>{wrongFileMessage}</p>}
        {isUploading ? <h3>... uploading image</h3> : null}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInput}
        />
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInput}
          autoComplete="email"
        />
        <br />
        <br />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleInput}
        />
        <br />
        <br />
        <label htmlFor="phoneNumber">Phone</label>
        <input
          type="tel"
          name="phoneNumber"
          pattern="^\+[1-9]\d{1,14}$"
          value={phoneNumber}
          onChange={handleInput}
          autoComplete="tel"
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

export default FormProfileEdit;
