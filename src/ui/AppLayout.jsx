import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="bg-background flex h-dvh flex-col items-center">
      <NavBar />
      <main className="flex h-full w-full flex-col gap-15 overflow-x-hidden overflow-y-auto pt-10">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default AppLayout;
