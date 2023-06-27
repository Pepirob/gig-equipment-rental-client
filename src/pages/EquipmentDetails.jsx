import { useParams } from "react-router-dom";
import PaymentIntent from "../hoc/PaymentIntent";
import SheetEquipment from "../components/SheetEquipment";
import FormCheckout from "../components/FormCheckout";
import FormTotalPrice from "../components/FormTotalPrice";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/NavBar/NavBar";
import NavigationAvatar from "../components/NavigationAvatar";
import { Button } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import { usePrice } from "../hooks/usePrice";
import { useDays } from "../hooks/useDays";
import { DATA_TYPE, useData } from "../hooks/useData";

function Equipment() {
  const params = useParams();
  const { equipmentId } = params;
  const { totalDays, setTotalDays } = useDays();
  const {
    getRent,
    getTotalPrice,
    showPayButton,
    showPaymentIntent,
    showTotalDays,
  } = usePrice();

  const { data, isFetching, user, loggedUser } = useData({
    query: equipmentId,
    type: DATA_TYPE.EQUIPMENT_DETAILS,
  });

  const handleTotalPrice = (event) => {
    event.preventDefault();
    getTotalPrice();
  };

  const handleRent = (event) => {
    event.preventDefault();
    getRent();
  };

  const equipment = data

  const isSomeoneElseEquipment = loggedUser?._id !== equipment?.owner._id;

  return (
    <>
      <NavBar>{user && <NavigationAvatar user={user} />}</NavBar>
      <Layout>
        {isFetching ? (
          <PulseLoader aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <>
            {equipment ? (
              <>
                <SheetEquipment equipment={equipment} />
                <section>
                  {isSomeoneElseEquipment && (
                    <>
                      {showTotalDays ? (
                        <>
                          <FormTotalPrice
                            setTotalDays={setTotalDays}
                            totalDays={totalDays}
                            pricePerDay={equipment.pricePerDay}
                            deposit={equipment.deposit}
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
                      productDetails={equipment}
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
