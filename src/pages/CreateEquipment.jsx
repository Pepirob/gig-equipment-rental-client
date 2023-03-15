import { Link } from "react-router-dom";
import FormCreateEquipment from "../components/FormCreateEquipment";

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
      <main>
        <FormCreateEquipment />
      </main>
    </>
  );
}

export default CreateEquipment;
