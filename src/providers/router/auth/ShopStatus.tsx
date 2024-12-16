import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router";

import { useSelector } from "@/providers/store/hooks";
import {
  selectShop,
  selectShopInitialLoadingCompleted,
} from "@/providers/store/features/shop/shopSlice";
import LoadingFallback from "../feedback/LoadingFallback";

interface ShopStatusProps {
  children: ReactNode;
  statusRedirectTo: string;
  activityStatuses: string[];
  paymentStatuses: string[];
}

const ShopStatus: FC<ShopStatusProps> = ({
  children,
  statusRedirectTo,
  activityStatuses,
  paymentStatuses,
}) => {
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
