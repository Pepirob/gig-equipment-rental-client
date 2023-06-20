import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export function usePrice() {
  const redirect = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [showPayButton, setShowPayButton] = useState(false);
  const [showTotalDays, setShowTotalDays] = useState(false);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  const getTotalPrice = () => {
    if (isLoggedIn) {
      setShowTotalDays(true);
      setShowPayButton(true);
    } else {
      redirect("/login");
    }
  };

  const getRent = () => {
    if (isLoggedIn) {
      setShowPaymentIntent(true);
      setShowPayButton(false);
    } else {
      redirect("/login");
    }
  };

  return {
    getRent,
    getTotalPrice,
    showPayButton,
    showPaymentIntent,
    showTotalDays,
  };
}
