
import TopBar from "../../../components/layouts/topbar";
import Locator from "./Locator";
import ThemeSelector from "./ThemeSelector";

export default function Settings() {

  return (
    <div className="flex flex-col min-h-screen  bg-[var(--bgc)]">
      <TopBar />

      {/* nav Bar */}
      <Locator/>
         
        {/* themes selection */}
        <ThemeSelector/>
        </div>

  );
}
