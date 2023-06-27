
import FormProfileEdit from "../components/FormProfileEdit";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";
import PulseLoader from "react-spinners/PulseLoader";
import { useUser } from "../hooks/useUser";

function ProfileEdit() {
  const { userData, isFetching } = useUser()
  const user = userData
  return (
    <>
      <NavBar>
        <NavItem path="/profile">Back</NavItem>
      </NavBar>
      <Layout>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
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
