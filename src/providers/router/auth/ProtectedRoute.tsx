import { FC, ReactNode } from 'react';

import { useSelector } from '@/providers/store/hooks';
import {
  selectUser,
  selectUserInitialLoadingCompleted,
} from '@/providers/store/features/user/userSlice';
import CountdownProgress from '@/components/common/feedback/CountdownProgress';
import LoadingFallback from '../feedback/LoadingFallback';

interface ProtectedRouteProps {
  children: ReactNode;
  authRedirectTo: string;
  roleRedirectTo: string;
  roles: string[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  authRedirectTo,
  roleRedirectTo,
  roles,
}) => {
  const user = useSelector(selectUser);
  const userInitialLoadingCompleted = useSelector(
    selectUserInitialLoadingCompleted
  );

  // check if the initial loading of the user completed, because before it is fetched initially it will be null and we don't want to be redirected
  if (!userInitialLoadingCompleted) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <CountdownProgress redirectTo={authRedirectTo} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <CountdownProgress redirectTo={roleRedirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
