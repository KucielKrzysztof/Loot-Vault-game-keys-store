import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect, type ReactNode } from "react";
import FullPageLoader from "../../../ui/FullPageLoader";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({
  children,
}: ProtectedRouteProps): React.JSX.Element | null {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending) return <FullPageLoader />;

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
