import { useContext, useRef, useState } from "react";
import { PaletteIcon, CaretDownIcon, CaretRightIcon, CheckIcon } from "@phosphor-icons/react";
import { ThemeContext } from "../../../theme/Themecontext";
import { themes } from "../../../theme";
import { toast } from "react-toastify";

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeRef = useRef(null);
  const [expanded, setExpanded] = useState(false); //for collapsed or expanded
  const [activePanel, setActivePanel] = useState("themes");  //themes preset && custom

  const [customTheme, setCustomTheme] = useState({
    "--bgc": "",
    "--sbgc": "",
    "--color": "",
    "--border": "",
    "--sbgurl": "",
    "--opacity": "",
    "--blur": ""
    });

    const [bgImage, setBgImage] = useState({
        url : "",
        opacity: "",
        blur: ""
        });


  const handleCustomThemeChange = (prop, val) =>{
    setCustomTheme(p =>({
        ...p,
        [prop]: val
    }));
  };


  const applyCustomTheme = () =>{
    const appliedTheme = {
        ...customTheme,
        "--sbgurl": customTheme["--sbgurl"],
        "--blur":  customTheme["--sbgurl"] ? customTheme["--blur"] : "",
        "--opacity":  customTheme["--sbgurl"]? customTheme["--opacity"]: ""
    };
    setTheme(appliedTheme);
    toast.success("Custom theme applied!")
  };


  const applyBackgroundImage = ()=>{
    if (bgImage.url.trim()!==""){
        setTheme(prev =>({
            ...prev,
        "--sbgurl": bgImage.url,
        "--blur": bgImage.blur,
        "--opacity":  bgImage.opacity
        }));
        setCustomTheme(prev=>({
          ...prev,
           "--sbgurl": bgImage.url,
        "--blur": bgImage.blur,
        "--opacity":  bgImage.opacity
          
        }))
        toast.success("Background updated!")
    }else{
      setTheme((prev)=>({
        ...prev,
          "--sbgurl": "",
    "--opacity": "",
    "--blur": ""
      }));
        setCustomTheme(prev=>({
          ...prev,
           "--sbgurl": bgImage.url,
        "--blur": bgImage.blur,
        "--opacity":  bgImage.opacity
        }))
        toast.info("Background updated!")

      
    }
  };

  const disableOB = bgImage.url.trim() === "";




  return (
        <div className="w-full px-6 mt-10">
          <div
            onClick={() => setExpanded(!expanded)} 
             className="flex items-center gap-2 cursor-pointer text-3xl font-bold hover:underline mt-10"
          >  
            <PaletteIcon size={32} weight="bold" /> 
            <span>Themes</span>
            {expanded ? 
            <CaretDownIcon size={32} weight="bold"/> :
             <CaretRightIcon size={32} weight="bold"/>
            }
          </div>
          {expanded && (
            <div className="mt-4">
              
              {/* //bg  */}
              <div className="rounded flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <label className="w-auto font-bold text-[var(--color)] text-sm">
                    Background URL
                  </label>
                  <input type="text"
                  value={bgImage.url}
                  onChange={(e)=>
                    setBgImage({...bgImage, url:e.target.value})
                  }
                  placeholder="Enter Image Url for web.."
                  className="flex-1 px-2 py-2 text-sm rounded border-3 border-[var(--border)] text-[var(--color)]"
                  />
                  <button
                  onClick={applyBackgroundImage}
                  disabled={disableOB}
                  className={`p-2 rounded border-3 border-[var(--border)] text-[var(--color) cursor-pointer hover:bg-[var(--sbgc)]`}
                  >
                    <CheckIcon size={24} weight="bold"
                    className="text-[var(--color)]"/>
                  </button>
                </div>
               
                {!disableOB && 
                <>
                <div className="flex items-center gap-4">
                  <label className="w-auto font-bold text-[var(--color)] text-sm">
                    Opacity
                  </label>
                  <input type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={bgImage.opacity}
                  onChange={(e)=>
                    setBgImage({
                      ...bgImage, opacity:e.target.value
                    })}
                    onMouseUp={applyBackgroundImage}
                  className="ml-15 flex-1 max-w-[150px] h-4  rounded-lg cursor-pointer"
                  style={{
                    accentColor: theme["--sbgc"]
                  }}
                  />
                  <span className="text-sm font-bold text-[var(--color)]">{bgImage.opacity}</span>
              </div>
                <div className="flex items-center gap-4">
                  <label className="w-auto font-bold text-[var(--color)] text-sm">
                    Blur
                  </label>
                  <input type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={bgImage.blur}
                  onChange={(e)=>
                   setBgImage({
                      ...bgImage, blur:e.target.value
                    })}
                     style={{
                    accentColor: theme["--sbgc"]
                  }}
                  className="ml-22 flex-1 max-w-[150px] h-4 rounded-lg cursor-pointer"
                    onMouseUp={applyBackgroundImage}
                  />
                  <span className="text-sm font-bold text-[var(--color)]">{bgImage.blur}px</span>
              </div>
              </>
              }
        </div>

                {/* toggler */}
                <div className="flex mt-4  mb-5 justify-end">
                    <button
                    onClick={() => setActivePanel(activePanel == "custom" ? "themes" : "custom")}
                    className="flex font-bold items-center gap-2 px-3 py-1.5 rounded text-sm
                    bg-[var(--sbgc)] border-3 border-[var(--border)] text-[var(--color)] cursor-pointer
                    "
               
               >
                        {activePanel ==="custom" ?"Preset": "Custom"}
                        </button>
                        </div>


    {/* //custom  */}
 {activePanel === "custom" && (
  <div className="mt-7 rounded-xl  bg-[var(--bgc)]">
    <div className="flex flex-col gap-3">
      {Object.entries({
        "--bgc": "Background",
        "--sbgc": "Sidebar",
        "--color": "Text",
        "--border": "Border",
      }).map((entry, i, arr) =>
        i % 2 === 0 ? (
          <div key={i} className="flex gap-x-50">
            {arr.slice(i, i + 2).map(([prop, label]) => (
              <div
                key={prop}
                className="flex flex-1 items-center justify-between"
              >
                <label className="text-sm font-bold text-[var(--color)] w-20">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customTheme[prop]}
                    onChange={(e) => handleCustomThemeChange(prop, e.target.value)}
                    className="px-2 py-1 w-50 text-sm rounded border-3 border-[var(--border)]  text-[var(--color)]"
                  />
                  <input
                    type="color"
                    value={customTheme[prop]}
                    onChange={(e) => handleCustomThemeChange(prop, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null
      )}
               
    <div className="mt-4 flex justify-end">
      <button
        onClick={applyCustomTheme}
        className="px-4 py-2  font-bold rounded-lg text-sm text-[var(--color)] 
        bg-[var(--bgc)] border-3 border-[var(--border)] cursor-pointer"
      >
        Apply
      </button>
    </div>
  </div>
  </div>
 )}
 {/* preset */}
   {activePanel === "themes" && (
          <div
            ref={themeRef}
            className="grid grid-cols-5 gap-2   items-center"
          >
            {Object.entries(themes).map(([name, colors]) => {
              const isActive = Object.entries(theme).every(
                ([key, val]) => colors[key] === val
              );

              return (
                <div
                  key={name}
                  onClick={() => setTheme(colors)}
                  className={`cursor-pointer border-3 rounded-md px-3 py-3  flex flex-col items-center justify-center 
                    ${
                      isActive
                        ? "border-[var(--border)] font-bold"
                        : " "
                    }`}
                  style={{
                    backgroundColor: colors["--sbgc"],
                    color: colors["--color"],
                    width: "305px",
                    height: "60px",
                  }}
                >
                  <div className="mb-1 text-xl">{name}</div>
                </div>
              );
            })}
          </div>
        )}
        </div>
        )}  
        </div>
    )    
}
