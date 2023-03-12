import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { equipmentDetailsService } from "../services/equipment.services";
import PaymentIntent from "../hoc/PaymentIntent";
import SheetEquipment from "../components/SheetEquipment";
import FormCheckout from "../components/FormCheckout";

function Equipment() {
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
              <div>
                {showPaymentIntent === false ? (
                  <button onClick={() => setShowPaymentIntent(true)}>
                    RENT
                  </button>
                ) : (
                  <PaymentIntent productDetails={equipmentDetails}>
                    <FormCheckout />
                  </PaymentIntent>
                )}
              </div>
            </section>
          </article>
        )}
      </main>
    </>
  );
}

export default Equipment;
