import { useContext } from "react";
import TagContext from "./TagContext";

export function useTags(){
    return useContext(TagContext);
}