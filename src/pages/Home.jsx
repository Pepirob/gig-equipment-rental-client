import { useContext } from "react";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/auth.context";

function Home() {
  const { isLoggedIn, loggedUser } = useContext(AuthContext);

  console.log(isLoggedIn, loggedUser);
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>Home</main>
    </>
  );
}

export default Home;
