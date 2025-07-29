import { useContext } from "react";
import { ThemeContext } from "./Themecontext";

export const useTheme = ()=>{
    return useContext(ThemeContext);
}