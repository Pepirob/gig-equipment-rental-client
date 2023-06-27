import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";

export function useUser() {
    const redirect = useNavigate();
    const { loggedUser, authenticateUser, isLoggedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!isLoggedIn) return
        try {
            const response = await getUserService(loggedUser._id);
            setUserData(response.data);
            setIsFetching(false);
        } catch (error) {
            redirect("/error");
        }
    };

    return { userData, isFetching, authenticateUser, loggedUser }
}