import { useEffect, useState } from "react";
import {
  getEquipmentDetailsService,
  getMyEquipmentService,
} from "../services/equipment.services";

import { useNavigate } from "react-router-dom";

export const DATA_SERVICE = {
  EQUIPMENT_DETAILS: getEquipmentDetailsService,
  MY_EQUIPMENT: getMyEquipmentService,
};

export const DATA_TYPE = {
  EQUIPMENT_DETAILS: "EQUIPMENT_DETAILS",
  MY_EQUIPMENT: "MY_EQUIPMENT",
};

export function useData({ query, type }) {
  const redirect = useNavigate();
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);


  let service;

  if (type === DATA_TYPE.EQUIPMENT_DETAILS) {
    service = DATA_SERVICE.EQUIPMENT_DETAILS;
  } else if (type === DATA_TYPE.MY_EQUIPMENT) {
    service = DATA_SERVICE.MY_EQUIPMENT;
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service(query);
      setData(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("/error");
    }
  };

  return { data, isFetching };
}
