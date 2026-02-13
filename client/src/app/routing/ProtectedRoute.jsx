import { useLocation } from "react-router";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import { Navigate } from "react-router";

const ProtectedRoute = ({ element, anonymous = false, user }) => {
  const location = useLocation();

  if (!user && !anonymous) {
    return (
      <Navigate to={CLIENT_ROUTES.AUTH} state={{ from: location }} replace />
    );
  }

  if (user && anonymous) {
    return <Navigate to={CLIENT_ROUTES.MAIN_PAGE} replace />;
  }

  return element;
};

export default ProtectedRoute;
