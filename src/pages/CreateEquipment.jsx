import { Link } from "react-router-dom";
import FormCreateEquipment from "../components/FormCreateEquipment";
import Navigation from "../components/Navigation";

function CreateEquipment() {
  return (
    <>
      <header>
        <Navigation />
        <h2>Publish Advert</h2>
      </header>
      <main>
        <FormCreateEquipment />
      </main>
    </>
  );
}

export default CreateEquipment;
