import { Link } from "react-router-dom";
import FormCreateEquipment from "../components/FormCreateEquipment";
import Navigation from "../components/Navigation";

function CreateEquipment() {
  return (
    <>
      <header>
        <Navigation />
        <h1>Publish new Equipment</h1>
      </header>
      <main>
        <FormCreateEquipment />
      </main>
    </>
  );
}

export default CreateEquipment;
