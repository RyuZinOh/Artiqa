import SideBar from "./sidebar";
import TopBar from "./topbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <SideBar />

      <div
        className="flex flex-col bg-[var(--bgc)] flex-1 overflow-y-auto h-screen box-border"
        style={{ willChange: "transform" }}
      >
        <TopBar />
        <main className="p-4 box-border">{children}</main>
      </div>
    </div>
  );
}