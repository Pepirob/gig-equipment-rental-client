import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEquipmentDetailsService } from "../services/equipment.services";
import { AuthContext } from "../context/auth.context";
import PaymentIntent from "../hoc/PaymentIntent";
import SheetEquipment from "../components/SheetEquipment";
import FormCheckout from "../components/FormCheckout";
import FormTotalPrice from "../components/FormTotalPrice";

function Equipment() {
  const MIN_DAYS = 1;
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const redirect = useNavigate();
  const params = useParams();
  const { equipmentId } = params;
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const [totalDays, setTotalDays] = useState(MIN_DAYS);
  const [showTotalDays, setShowTotalDays] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getEquipmentDetailsService(equipmentId);
      console.log(response);
      setEquipmentDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleTotalPrice = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      setShowTotalDays(true);
      setShowPayButton(true);
    } else {
      redirect("/login");
    }
  };
  const handleRent = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      setShowPaymentIntent(true);
      setShowPayButton(false);
    } else {
      redirect("/login");
    }
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
      </header>
      <main>
        {isFetching === true ? (
          <h2>...Buscando</h2>
        ) : (
          <article>
            <>
              {equipmentDetails ? (
                <>
                  <SheetEquipment equipment={equipmentDetails} />
                  <section>
                    {!showTotalDays &&
                      loggedUser?._id !== equipmentDetails.owner && (
                        <button onClick={handleTotalPrice}>RENT</button>
                      )}

                    {showTotalDays &&
                      loggedUser?._id !== equipmentDetails.owner && (
                        <>
                          <FormTotalPrice
                            setTotalDays={setTotalDays}
                            totalDays={totalDays}
                            pricePerDay={equipmentDetails.pricePerDay}
                            deposit={equipmentDetails.deposit}
                          />
                          {showPayButton && (
                            <button onClick={handleRent}>PAY</button>
                          )}
                        </>
                      )}

                    {showPaymentIntent &&
                      loggedUser?._id !== equipmentDetails.owner && (
                        <PaymentIntent
                          productDetails={equipmentDetails}
                          totalDays={totalDays}
                        >
                          <FormCheckout />
                        </PaymentIntent>
                      )}
                  </section>
                </>
              ) : (
                <h2>We're sorry! This equipment isn't currently available</h2>
              )}
            </>
          </article>
        )}
      </main>
    </>
  );
}

export default Equipment;
