import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { Link, useNavigate } from "react-router-dom";
import FormProfileEdit from "../components/FormProfileEdit";

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
      <header>
        <Link to="/profile">Profile</Link>
      </header>
      <main>
        {isFetching ? (
          <h2>...loading data</h2>
        ) : (
          <>
            <h1>Edit {user.username}'s Profile </h1>
            <FormProfileEdit userData={user} />
          </>
        )}
      </main>
    </>
  );
}

export default ProfileEdit;
