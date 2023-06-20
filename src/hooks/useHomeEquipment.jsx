import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";
import {
  getAvailableEquipmentService,
  getLocatedEquipmentService,
} from "../services/equipment.services";

export function useHomeEquipmentData({ searchInput }) {
  const redirect = useNavigate();
  const [availableEquipment, setAvailableEquipment] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useDebounce(searchInput, 500, () => getData());

  const getData = async () => {
    try {
      const response = await (searchInput
        ? getLocatedEquipmentService(searchInput)
        : getAvailableEquipmentService());

      setAvailableEquipment(response.data);
      setIsFetching(false);
    } catch (error) {
      redirect("error");
    }
  };
  return { availableEquipment, isFetching };
}
