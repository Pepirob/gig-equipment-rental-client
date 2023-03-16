import FormRegister from "../../components/FormRegister";
import Layout from "../../components/Layout";
import Navigation from "../../components/Navigation";

function Register() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Layout>
        <FormRegister />
      </Layout>
    </>
  );
}

export default Register;
