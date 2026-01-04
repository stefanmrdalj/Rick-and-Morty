import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../modules/auth/authStore";
import { observer } from "mobx-react-lite";

type ProtectedRouteProps = {
  redirectTo?: string;
};

const ProtectedRoutes = observer(
  ({ redirectTo = "/" }: ProtectedRouteProps) => {
    if (!authStore.loggedInUser) {
      return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
  }
);

export default ProtectedRoutes;
