import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import FullPageLoader from "../../../ui/FullPageLoader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending) return <FullPageLoader />;

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
