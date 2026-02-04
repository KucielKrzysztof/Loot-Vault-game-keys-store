import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import FullPageLoader from "./FullPageLoader";
import CartDrawer from "../Features/cart/components/CartDrawer";
import { useScrollOnNavigation } from "../hooks/useScrollOnNavigation";

function AppLayout(): React.JSX.Element {
  const location = useLocation();
  useScrollOnNavigation();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <NavBar />
      <CartDrawer />
      <main className="flex h-full min-h-screen w-full grow flex-col overflow-x-hidden py-15">
        <Suspense key={location.key} fallback={<FullPageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
