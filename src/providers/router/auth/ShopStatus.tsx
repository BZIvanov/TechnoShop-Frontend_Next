import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useSelector } from "@/providers/store/hooks";
import {
  selectShop,
  selectShopInitialLoadingCompleted,
} from "@/providers/store/features/shop/shopSlice";
import LoadingFallback from "../feedback/LoadingFallback";

interface ShopStatusProps {
  statusRedirectTo: string;
  activityStatuses: string[];
  paymentStatuses: string[];
}

const ShopStatus = ({
  children,
  statusRedirectTo,
  activityStatuses,
  paymentStatuses,
}: PropsWithChildren<ShopStatusProps>) => {
  const shop = useSelector(selectShop);
  const shopInitialLoadingCompleted = useSelector(
    selectShopInitialLoadingCompleted
  );

  if (!shopInitialLoadingCompleted) {
    return <LoadingFallback />;
  }

  if (
    !activityStatuses.includes(shop.activityStatus) ||
    !paymentStatuses.includes(shop.paymentStatus)
  ) {
    return <Navigate to={statusRedirectTo} replace={true} />;
  }

  return children;
};

export default ShopStatus;
