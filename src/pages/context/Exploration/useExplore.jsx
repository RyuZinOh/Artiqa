import ExploreContext from "./ExploreContext";
import { useContext } from "react";

export function useExplore(){
    return useContext(ExploreContext);
}