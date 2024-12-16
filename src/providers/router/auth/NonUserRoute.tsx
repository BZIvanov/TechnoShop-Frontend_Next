import { type FC, type ReactNode } from "react";
import { useLocation, Navigate } from "react-router";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";

interface NonUserRouteProps {
  children: ReactNode;
}

const NonUserRoute: FC<NonUserRouteProps> = ({ children }) => {
  const location = useLocation();

  const user = useSelector(selectUser);

  if (user) {
    const customNavigateTo = location.state?.customNavigateTo;
    if (customNavigateTo) {
      return <Navigate to={customNavigateTo} replace={true} />;
    }

    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default NonUserRoute;
