import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteUserService, getUserService } from "../services/user.services";
import { Link, useNavigate } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import { deleteAllEquipmentService } from "../services/equipment.services";
import { deleteTransactionsByUserService } from "../services/transactions.services";
import Layout from "../components/Layout/Layout";

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
      await deleteTransactionsByUserService(loggedUser._id);
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
      <Layout>
        {isFetching ? (
          <h2>...loading data</h2>
        ) : (
          <>
            {userData ? (
              <>
                <UserDetails user={userData} />
                <Link to={`/profile/edit`}>EDIT PROFILE</Link>
                <br />
                <br />
                <button onClick={handleDelete}>DELETE ACCOUNT</button>
                {errorMessage && <p>{errorMessage}</p>}
              </>
            ) : (
              <h2>Sorry, this user isn't currently available!</h2>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default Profile;
