import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { equipmentDetailsService } from "../services/equipment.services";
import { AuthContext } from "../context/auth.context";
import PaymentIntent from "../hoc/PaymentIntent";
import SheetEquipment from "../components/SheetEquipment";
import FormCheckout from "../components/FormCheckout";

function Equipment() {
  const { isLoggedIn } = useContext(AuthContext);
  const redirect = useNavigate();
  const params = useParams();
  const { equipmentId } = params;
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await equipmentDetailsService(equipmentId);
      setEquipmentDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleRent = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      setShowPaymentIntent(true);
    } else {
      redirect("/login");
    }
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>{" "}
      </header>
      <main>
        {isFetching === true ? (
          <h2>...Buscando</h2>
        ) : (
          <article>
            <SheetEquipment equipment={equipmentDetails} />
            <section>
              {!showPaymentIntent && <button onClick={handleRent}>RENT</button>}

              {showPaymentIntent && (
                <PaymentIntent productDetails={equipmentDetails}>
                  <FormCheckout />
                </PaymentIntent>
              )}
            </section>
          </article>
        )}
      </main>
    </>
  );
}

export default Equipment;
