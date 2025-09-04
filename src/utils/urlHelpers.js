const BASE_URL = import.meta.env.VITE_STATIC_BASE_URL;
export function getFullUrl(path) {
    if (path.startsWith("http://")){
      return path;
    }    
    return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  }


