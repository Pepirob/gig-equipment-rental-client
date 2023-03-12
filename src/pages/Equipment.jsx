import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaymentIntent from "../hoc/PaymentIntent";
import DetailsEquipment from "../components/DetailsEquipment";
import { equipmentDetailsService } from "../services/equipment.services";

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
        <Link to="/my-equipment">Back</Link>{" "}
      </header>
      <main>
        {isFetching === true ? (
          <h2>...Buscando</h2>
        ) : (
          <article>
            <DetailsEquipment equipment={equipmentDetails} />
            <section>
              <div>
                {showPaymentIntent === false ? (
                  <button onClick={() => setShowPaymentIntent(true)}>
                    RENT
                  </button>
                ) : (
                  <PaymentIntent productDetails={equipmentDetails} />
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
