import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteUserService, getUserService } from "../services/user.services";
import { Link, useNavigate } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import { deleteAllEquipmentService } from "../services/equipment.services";

function Profile() {
  const redirect = useNavigate();
  const { loggedUser, authenticateUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getUserService(loggedUser._id);
      setUserData(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await deleteUserService(loggedUser._id);
      await deleteAllEquipmentService(loggedUser._id);

      localStorage.removeItem("authToken");
      authenticateUser();
      redirect("/");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <main>
        {isFetching ? (
          <h2>...loading data</h2>
        ) : (
          <>
            <UserDetails user={userData} />
            <Link to={`/profile/edit`}>EDIT PROFILE</Link>
            <br />
            <br />
            <button onClick={handleDelete}>DELETE ACCOUNT</button>
            {errorMessage && <p>{errorMessage}</p>}
          </>
        )}
      </main>
    </>
  );
}

export default Profile;
