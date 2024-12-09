import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import App from "@/App";
import ShopLayout from "@/components/layouts/ShopLayout";
import ManagementLayout from "@/components/layouts/ManagementLayout";
import UserRegister from "@/components/auth/register/UserRegister";
import UserLogin from "@/components/auth/login/UserLogin";
import PasswordReset from "@/components/auth/reset-password/PasswordReset";
import Home from "@/components/home/Home";
import Shop from "@/components/shop/Shop";
import ProductDetailed from "@/components/products/detailed/ProductDetailed";
import Cart from "@/components/cart/Cart";
import CategoryProducts from "@/components/products/CategoryProducts";
import SubcategoryProducts from "@/components/products/SubcategoryProducts";
import NotFound from "./feedback/NotFound";
import ErrorBoundary from "./feedback/ErrorBoundary";
import NonUserRoute from "./auth/NonUserRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import ShopStatus from "./auth/ShopStatus";
import {
  AdminDashboard,
  AdminOrders,
  ManageShops,
  ShopDetails,
  ManageCategory,
  ManageSubcategory,
  ManageCoupons,
  AdminSellerChat,
  SellerDashboard,
  SellerOrders,
  ManageShop,
  ManageProduct,
  ManageProducts,
  SellerAdminChat,
  SellerBuyerChat,
  BuyerDashboard,
  BuyerOrders,
  ManageWishList,
  BuyerSellerChat,
  UserProfile,
} from "./lazy-routes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <ShopLayout />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "shop",
        element: <ShopLayout />,
        children: [{ path: "", element: <Shop /> }],
      },
      {
        path: "products/:productId",
        element: <ShopLayout />,
        children: [{ path: "", element: <ProductDetailed /> }],
      },
      {
        path: "cart",
        element: <ShopLayout />,
        children: [{ path: "", element: <Cart /> }],
      },
      {
        path: "category/:categoryId",
        element: <ShopLayout />,
        children: [{ path: "", element: <CategoryProducts /> }],
      },
      {
        path: "subcategory/:subcategoryId",
        element: <ShopLayout />,
        children: [{ path: "", element: <SubcategoryProducts /> }],
      },
      {
        path: "auth",
        element: (
          <NonUserRoute>
            <ShopLayout />
          </NonUserRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="login" replace={true} />, // Default redirect to /auth/login
          },
          {
            path: "register",
            element: <UserRegister />,
          },
          {
            path: "login",
            element: <UserLogin />,
          },
          {
            path: "reset-password/:token",
            element: <PasswordReset />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute
            authRedirectTo="/auth/login"
            roleRedirectTo="/"
            roles={["admin"]}
          >
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="dashboard" replace={true} />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "shops",
            element: <ManageShops />,
          },
          {
            path: "shops/:shopId",
            element: <ShopDetails />,
          },
          {
            path: "category",
            element: <ManageCategory />,
          },
          {
            path: "subcategory",
            element: <ManageSubcategory />,
          },
          {
            path: "coupon",
            element: <ManageCoupons />,
          },
          {
            path: "chat",
            element: <AdminSellerChat />,
          },
          {
            path: "chat/:receiverId",
            element: <AdminSellerChat />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "seller",
        element: (
          <ProtectedRoute
            authRedirectTo="/auth/login"
            roleRedirectTo="/"
            roles={["seller"]}
          >
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="dashboard" replace={true} />,
          },
          {
            path: "dashboard",
            element: <SellerDashboard />,
          },
          {
            path: "orders",
            element: <SellerOrders />,
          },
          {
            path: "shop",
            element: <ManageShop />,
          },
          {
            // singular product for add/edit
            path: "product",
            element: (
              <ShopStatus
                statusRedirectTo="/seller/shop"
                activityStatuses={["active"]}
                paymentStatuses={["paid"]}
              >
                <ManageProduct />
              </ShopStatus>
            ),
          },
          {
            path: "product/:productId",
            element: (
              <ShopStatus
                statusRedirectTo="/seller/shop"
                activityStatuses={["active"]}
                paymentStatuses={["paid"]}
              >
                <ManageProduct />
              </ShopStatus>
            ),
          },
          // plural products for listing and details
          {
            path: "products",
            element: <ManageProducts />,
          },
          {
            path: "chat-admin",
            element: <SellerAdminChat />,
          },
          {
            path: "chat",
            element: <SellerBuyerChat />,
          },
          {
            path: "chat/:receiverId",
            element: <SellerBuyerChat />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "buyer",
        element: (
          <ProtectedRoute
            authRedirectTo="/auth/login"
            roleRedirectTo="/"
            roles={["buyer"]}
          >
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="dashboard" replace={true} />,
          },
          {
            path: "dashboard",
            element: <BuyerDashboard />,
          },
          {
            path: "orders",
            element: <BuyerOrders />,
          },
          {
            path: "wishlist",
            element: <ManageWishList />,
          },
          {
            path: "chat",
            element: <BuyerSellerChat />,
          },
          {
            path: "chat/:receiverId",
            element: <BuyerSellerChat />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
