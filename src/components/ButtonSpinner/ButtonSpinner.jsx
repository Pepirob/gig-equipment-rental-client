import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ButtonSpinner = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props}>
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            variant="light"
          />
          <span style={{ marginLeft: ".5rem" }}>loading</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonSpinner;
