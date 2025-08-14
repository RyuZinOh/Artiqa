import { useEffect, useState } from "react";
import { themes } from ".";
import { ThemeContext } from "./Themecontext";

function updateFavicon(letter) {
  const root = document.documentElement;
  // wont change at runtime
  // const primaryColor =  defaultTheme["--sbgc"];

  // changes at runtime
  const primaryColor = getComputedStyle(root)
    .getPropertyValue("--sbgc")
    .trim();

const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <rect x="0" y="0" width="256" height="256" fill="black" rx="100" ry="100" />
    <text x="50%" y="50%" font-family="Poppins, Arial, sans-serif" font-size="200" fill="${primaryColor}" dominant-baseline="middle" text-anchor="middle">${letter}</text>
  </svg>
`;

  const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

  let link = document.getElementById("dynamic-favicon");
  link.href = dataUrl;
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.monochromeMist);

    useEffect(()=>{
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }
    updateFavicon("A");
  }, [theme]);

    return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
      </ThemeContext.Provider>
    );
};

