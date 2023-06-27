import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export function useLogout() {
    const redirect = useNavigate();
    const { authenticateUser, loggedUser } = useUser();

    const handleLogout = () => {
        localStorage.removeItem("authToken");

        authenticateUser();

        redirect("/");
    };
    return { loggedUser, handleLogout }
}