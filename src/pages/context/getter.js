import { API_BASE } from "../../utils/api";

export async function fetchAllArts() {
      try{
        const res = await fetch(`${API_BASE}/artists/all-arts`,);
            if (!res.ok) throw new Error("Failed to fetch arts");
            const data = await res.json();
            return data;
      }catch(erro){
        console.error(erro);
      }

    };