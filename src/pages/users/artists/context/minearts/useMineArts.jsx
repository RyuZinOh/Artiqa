import { useContext } from "react";
import MineArtsContext from "./MineArtsContext";
export function useMineArts(){
    const context = useContext(MineArtsContext);
    return context;
}