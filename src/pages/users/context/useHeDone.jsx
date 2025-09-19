import { useContext } from "react";
import HeDoneContext from "./HeDoneContext";

export function useHeDone() {
  return useContext(HeDoneContext);
}
