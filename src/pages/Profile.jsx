import { Link } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationAvatar from "../components/NavigationAvatar";
import PulseLoader from "react-spinners/PulseLoader";
import { useUser } from "../hooks/useUser";
import { useDeleteAccount } from "../hooks/useDeleteAcount";

function Profile() {
  const { userData, isFetching } = useUser()
  const { errorMessage, handleDelete } = useDeleteAccount()

  return (
    <>
      <NavBar>{userData && <NavigationAvatar user={userData} />}</NavBar>
      <Layout>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
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
