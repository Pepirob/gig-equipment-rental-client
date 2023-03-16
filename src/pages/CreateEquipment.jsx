import { Link } from "react-router-dom";
import FormCreateEquipment from "../components/FormCreateEquipment";
import Layout from "../components/Layout/Layout";

function CreateEquipment() {
  return (
    <>
      <header>
        <nav>
          <Link style={{ marginRight: "1rem" }} to="/my-equipment">
            Equipment
          </Link>
        </nav>
        <h1>Publish new Equipment</h1>
      </header>
      <Layout>
        <FormCreateEquipment />
      </Layout>
    </>
  );
}

export default CreateEquipment;
