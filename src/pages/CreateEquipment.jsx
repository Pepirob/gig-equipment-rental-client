import FormCreateEquipment from "../components/FormCreateEquipment";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem";

function CreateEquipment() {
  return (
    <>
      <NavBar>
        <NavItem path="/my-equipment">Equipment</NavItem>
      </NavBar>
      <Layout>
        <h1>Publish new Equipment</h1>
        <FormCreateEquipment />
      </Layout>
    </>
  );
}

export default CreateEquipment;
