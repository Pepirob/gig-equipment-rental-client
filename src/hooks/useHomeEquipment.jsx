import { useRef, useState } from "react";
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
  const prevSearch = useRef(searchInput)
  useDebounce(searchInput, 500, () => getData());

  const getData = async () => {
    if (searchInput === prevSearch.current) return
    try {
      prevSearch.current = searchInput
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
