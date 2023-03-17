import Container from "react-bootstrap/Container";
import "./Layout.css";

function Layout(props) {
  return (
    <Container className="layout" as="main" fluid="sm">
      {props.children}
    </Container>
  );
}

export default Layout;
