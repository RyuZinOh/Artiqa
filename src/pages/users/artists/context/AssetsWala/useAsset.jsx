import { useContext } from "react";
import AssetContext from "./AssetContext";

export function  useAssets(){
  const context = useContext(AssetContext);
  return context;
}