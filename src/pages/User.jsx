import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserService } from "../services/user.services";
import UserDetails from "../components/UserDetails";
import Layout from "../components/Layout/Layout";

function User() {
  const redirect = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getUserService(userId);
      setUserData(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
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

export default User;
