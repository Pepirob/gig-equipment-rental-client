import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { Link, useNavigate } from "react-router-dom";
import FormProfileEdit from "../components/FormProfileEdit";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";

function ProfileEdit() {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getUserService(loggedUser._id);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <NavBar>
        <NavItem path="/profile">Back</NavItem>
      </NavBar>
      <Layout>
        {isFetching ? (
          <h2>...loading data</h2>
        ) : (
          <>
            <h1>Edit {user.username}'s Profile </h1>
            <FormProfileEdit userData={user} />
          </>
        )}
      </Layout>
    </>
  );
}

export default ProfileEdit;
