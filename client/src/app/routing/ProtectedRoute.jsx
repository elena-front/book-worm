import { useLocation } from "react-router";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import { Navigate } from "react-router";

// const ProtectedRoute = ({ element, anonymous = false, user }) => {
//   const location = useLocation();
//   const from = location.state?.from || CLIENT_ROUTES.MAIN_PAGE;
//   if (anonymous && user != null) {
//     return <Navigate to={from} />;
//   }

//   if (!anonymous && user == null) {
//     return <Navigate to={CLIENT_ROUTES.AUTH} state={{ from: location }} />;
//   }

//   return element;
// };

const ProtectedRoute = ({ element, anonymous = false, user }) => {
  const location = useLocation();

  if (!user && !anonymous) {
    return <Navigate to={CLIENT_ROUTES.AUTH} state={{ from: location }} replace />;
  }

  if (user && anonymous) {
    return <Navigate to={CLIENT_ROUTES.MAIN_PAGE} replace />;
  }

  return element;
};


export default ProtectedRoute;
