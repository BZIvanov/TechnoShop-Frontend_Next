import { type FC, Suspense } from "react";
import { RouterProvider } from "react-router";

import router from "./AppRoutes";
import LoadingFallback from "./feedback/LoadingFallback";

const BrowserRouterProvider: FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default BrowserRouterProvider;
