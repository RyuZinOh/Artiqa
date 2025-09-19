import { useContext } from "react";
import StatisticsContext from "./StatisticsContext";

export function useStatistics() {
  return useContext(StatisticsContext);
}
