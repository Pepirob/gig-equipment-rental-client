import { useContext, useEffect, useState } from "react";
import {
  getEquipmentDetailsService,
  getMyEquipmentService,
} from "../services/equipment.services";
import { AuthContext } from "../context/auth.context";
import { getUserService } from "../services/user.services";
import { useNavigate } from "react-router-dom";

export const DATA_SERVICE = {
  EQUIPMENT_DETAILS: getEquipmentDetailsService,
  MY_EQUIPMENT: getMyEquipmentService,
};

export const DATA_TYPE = {
  EQUIPMENT_DETAILS: "EQUIPMENT_DETAILS",
  MY_EQUIPMENT: "MY_EQUIPMENT",
};

export function useEquipmentData({ query, type }) {
  const redirect = useNavigate();
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const [equipment, setEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);

  let service;

  if (type === DATA_TYPE.EQUIPMENT_DETAILS) {
    service = DATA_SERVICE.EQUIPMENT_DETAILS;
  } else {
    service = DATA_SERVICE.MY_EQUIPMENT;
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service(query);

      setEquipment(response.data);

      if (isLoggedIn) {
        const userResponse = await getUserService(loggedUser._id);
        setUser(userResponse.data);
      }

      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return { equipment, isFetching, user, loggedUser };
}
