import PortfolioContext from "./PortfolioContext";
import { useContext } from "react";
export default function usePortfolio(){
    return useContext(PortfolioContext);
}