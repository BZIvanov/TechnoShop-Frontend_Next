import { lazy } from "react";

// use separate file for lazy imports to avoid lint warning 'eslint(react-refresh/only-export-components)'

// admin routes
export const AdminDashboard = lazy(
  () => import("@/components/manage/admin/dashboard/AdminDashboard")
);
export const AdminOrders = lazy(
  () => import("@/components/manage/admin/orders/AdminOrders")
);
export const ManageShops = lazy(
  () => import("@/components/manage/admin/shops/ManageShops")
);
export const ShopDetails = lazy(
  () => import("@/components/manage/admin/shops/ShopDetails")
);
export const ManageCategory = lazy(
  () => import("@/components/manage/admin/categories/ManageCategory")
);
export const ManageSubcategory = lazy(
  () => import("@/components/manage/admin/subcategories/ManageSubcategory")
);
export const ManageCoupons = lazy(
  () => import("@/components/manage/admin/coupons/ManageCoupons")
);
export const AdminSellerChat = lazy(
  () => import("@/components/manage/admin/chat/AdminSellerChat")
);

// seller routes
export const SellerDashboard = lazy(
  () => import("@/components/manage/seller/dashboard/SellerDashboard")
);
export const SellerOrders = lazy(
  () => import("@/components/manage/seller/orders/SellerOrders")
);
export const ManageShop = lazy(
  () => import("@/components/manage/seller/shop/ManageShop")
);

// buyer routes
export const BuyerDashboard = lazy(
  () => import("@/components/manage/buyer/dashboard/BuyerDashboard")
);
export const BuyerOrders = lazy(
  () => import("@/components/manage/buyer/orders/BuyerOrders")
);
export const ManageWishList = lazy(
  () => import("@/components/manage/buyer/wishlist/ManageWishList")
);
export const BuyerSellerChat = lazy(
  () => import("@/components/manage/buyer/chat/BuyerSellerChat")
);

// common routes
export const UserProfile = lazy(
  () => import("@/components/manage/common/profile/UserProfile")
);
