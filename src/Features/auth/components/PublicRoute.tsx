import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import FullPageLoader from "../../../ui/FullPageLoader";

interface PublicRouteProps {
  children: ReactNode;
}

function PublicRoute({ children }: PublicRouteProps): React.JSX.Element | null {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !isPending) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending) return <FullPageLoader />;

  return !isAuthenticated ? <>{children} </> : null;
}

export default PublicRoute;
