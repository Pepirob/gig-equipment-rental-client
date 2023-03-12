import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadUserImgService } from "../services/upload.services";

function FormProfileEdit() {
  const redirect = useNavigate;
  const [imgUrl, setImgUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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
    } catch (error) {
      redirect("/error");
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      default:
        setUsername(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      {imgUrl ? (
        <div>
          <img src={imgUrl} alt="img" width={200} />
        </div>
      ) : null}
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
        {isUploading ? <h3>... uploading image</h3> : null}
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInput}
          autoComplete="username"
        />
        <br />
        <br />
        <button onClick={handleSubmit} disabled={isFetching}>
          UPDATE
        </button>
      </form>
    </>
  );
}

export default FormProfileEdit;
