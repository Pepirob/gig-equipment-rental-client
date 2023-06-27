import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import { useState } from "react";
import { deleteUserService } from "../services/user.services";
import { deleteTransactionsByUserService } from "../services/transactions.services";
import { deleteAllEquipmentService } from "../services/equipment.services";

export function useDeleteAccount() {
    const redirect = useNavigate();
    const { loggedUser, authenticateUser } = useUser()
    const [errorMessage, setErrorMessage] = useState("");
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            await deleteUserService(loggedUser._id);
            await deleteTransactionsByUserService(loggedUser._id);
            await deleteAllEquipmentService(loggedUser._id);

            localStorage.removeItem("authToken");
            authenticateUser();
            redirect("/");
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    };
    return { errorMessage, handleDelete }
}