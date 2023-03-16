import Navigation from "../../components/Navigation";
import FormLogin from "../../components/FormLogin";
import Layout from "../../components/Layout";

function Login() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Layout>
        <FormLogin />
      </Layout>
    </>
  );
}

export default Login;
