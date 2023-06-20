import { useState } from "react";

export function useDays() {
  const MIN_DAYS = 1;
  const [totalDays, setTotalDays] = useState(MIN_DAYS);

  return { totalDays, setTotalDays };
}
