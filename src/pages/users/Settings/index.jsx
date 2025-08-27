
import TopBar from "../../../components/layouts/topbar";
import Account from "./Account";
import Api from "./Api";
import Danger from "./Danger";
import Locator from "./Locator";
import ThemeSelector from "./ThemeSelector";

export default function Settings() {

  return (
    <div className="flex flex-col min-h-screen  bg-[var(--bgc)]">
      <TopBar />  
      {/* nav Bar */}
      <Locator/>   
      {/* themes selection */}
      <div id="Themes">
        <ThemeSelector/>  
      </div>
      {/* account  */}
      <div id="Account">
        <Account/>
      </div>
      {/* danzerzone */}
      <div id="Danger-Zone">
        <Danger/>
      </div>
      {/* api  */}
      <div id="API">
        <Api/>
      </div>
    </div>

  );
}
