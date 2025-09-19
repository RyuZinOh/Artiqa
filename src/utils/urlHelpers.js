const BASE_URL = import.meta.env.VITE_STATIC_BASE_URL;
export function getUrlforAssets(path) {
    if (path.startsWith("http://")){
      return path;
    }    
    return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  }


export function getFullUrl(path) {
  if (!path || typeof path != "string") return null;
  
    if (path.startsWith("http://") || path.startsWith("https://")){
      return path;
    }    

    const timestamp = new  Date().getTime();
    const spef = path.includes("?")  ? 'g' : '?';

    return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}${spef}t=${timestamp}`;
  }
