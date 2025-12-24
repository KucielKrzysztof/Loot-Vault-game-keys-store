import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import FullPageLoader from "./FullPageLoader";

function AppLayout() {
  const location = useLocation();
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <NavBar />
      <main className="h-full min-h-screen w-full grow overflow-x-hidden py-15">
        <Suspense key={location.key} fallback={<FullPageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
