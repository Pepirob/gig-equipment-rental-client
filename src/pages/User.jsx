
import { useParams } from "react-router-dom";

import UserDetails from "../components/UserDetails";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationAvatar from "../components/NavigationAvatar";
import PulseLoader from "react-spinners/PulseLoader";

import { useUser } from "../hooks/useUser";

function User() {
  const { userId } = useParams();
  const { user, isFetching, ownerData } = useUser({ query: userId })
  const clientData = user


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
