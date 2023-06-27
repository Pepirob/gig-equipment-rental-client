import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePaymentIntentService } from "../services/payment.services";

export function usePaymentIntent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [transaction, setTransaction] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        handleUseEffect();
    }, []);

    const handleUseEffect = async () => {
        const clientSecret = new URLSearchParams(location.search).get(
            "payment_intent_client_secret"
        );
        const paymentIntentId = new URLSearchParams(location.search).get(
            "payment_intent"
        );

        const paymentIntentInfo = {
            clientSecret: clientSecret,
            paymentIntentId: paymentIntentId,
        };

        try {
            const response = await updatePaymentIntentService(paymentIntentInfo);

            setIsFetching(false);
            setTransaction(response.data);
        } catch (error) {
            navigate("/error");
        }
    };
    return { transaction, isFetching }

}