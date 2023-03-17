import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function NavigationCta() {
  const redirect = useNavigate();

  const handlePublish = (event) => {
    event.preventDefault();
    redirect("/create-equipment");
  };

  return (
    <Nav.Item as="li">
      <Button as="a" variant="success" onClick={handlePublish}>
        Rent your Equipment
      </Button>
    </Nav.Item>
  );
}

export default NavigationCta;
