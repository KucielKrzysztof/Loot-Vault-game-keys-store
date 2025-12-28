import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import FullPageLoader from "../../../ui/FullPageLoader";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !isPending) {
      navigate("/home");
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending) return <FullPageLoader />;

  return !isAuthenticated ? children : null;
}

export default PublicRoute;
