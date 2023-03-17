import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEquipmentDetailsService } from "../services/equipment.services";
import { getUserService } from "../services/user.services";
import { AuthContext } from "../context/auth.context";
import PaymentIntent from "../hoc/PaymentIntent";
import SheetEquipment from "../components/SheetEquipment";
import FormCheckout from "../components/FormCheckout";
import FormTotalPrice from "../components/FormTotalPrice";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationAvatar from "../components/NavigationAvatar";
import { Button } from "react-bootstrap";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getEquipmentDetailsService(equipmentId);

      const userResponse = await getUserService(loggedUser._id);
      setEquipmentDetails(response.data);
      setUser(userResponse.data);
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

  const isSomeoneElseEquipment =
    loggedUser?._id !== equipmentDetails?.owner._id;

  return (
    <>
      <NavBar>{user && <NavigationAvatar user={user} />}</NavBar>
      <Layout>
        {isFetching === true ? (
          <h2>...Buscando</h2>
        ) : (
          <>
            {equipmentDetails ? (
              <>
                <SheetEquipment item={equipmentDetails} />
                <section>
                  {isSomeoneElseEquipment && (
                    <>
                      {showTotalDays ? (
                        <>
                          <FormTotalPrice
                            setTotalDays={setTotalDays}
                            totalDays={totalDays}
                            pricePerDay={equipmentDetails.pricePerDay}
                            deposit={equipmentDetails.deposit}
                          />
                          {showPayButton && (
                            <Button variant="primary" onClick={handleRent}>
                              PAY
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button variant="primary" onClick={handleTotalPrice}>
                          RENT
                        </Button>
                      )}
                    </>
                  )}

                  {showPaymentIntent && isSomeoneElseEquipment && (
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
        )}
      </Layout>
    </>
  );
}

export default Equipment;
