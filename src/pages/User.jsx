import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserService } from "../services/user.services";
import UserDetails from "../components/UserDetails";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationAvatar from "../components/NavigationAvatar";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthContext } from "../context/auth.context";
// AuthContext;
// useContext;

function User() {
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const { userId } = useParams();
  const [ownerData, setOwnerData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseOwner = await getUserService(userId);

      const responseClient = await getUserService(loggedUser._id);

      setOwnerData(responseOwner.data);
      setClientData(responseClient.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <>
      <NavBar>{clientData && <NavigationAvatar user={clientData} />}</NavBar>
      <Layout>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <>
            {ownerData ? (
              <>
                <UserDetails user={ownerData} />
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
