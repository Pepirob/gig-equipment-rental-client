import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import FormProfileEdit from "../components/FormProfileEdit";

function ProfileEdit() {
  const [isFetching, setIsFetching] = useState(false);

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
            <h1>Edit Profile</h1>
            <FormProfileEdit />
          </>
        )}
      </main>
    </>
  );
}

export default ProfileEdit;
