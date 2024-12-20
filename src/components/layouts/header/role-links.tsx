import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DiscountIcon from "@mui/icons-material/Discount";
import GradientIcon from "@mui/icons-material/Gradient";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ChatIcon from "@mui/icons-material/Chat";
import PasswordIcon from "@mui/icons-material/Password";

const adminLinks = [
  {
    toLink: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    linkText: "Dashboard",
  },
  {
    toLink: "orders",
    icon: <ArticleIcon fontSize="small" />,
    linkText: "Manage Orders",
  },
  {
    toLink: "shops",
    icon: <BusinessIcon fontSize="small" />,
    linkText: "Manage Shops",
  },
  {
    toLink: "category",
    icon: <CategoryIcon fontSize="small" />,
    linkText: "Manage Categories",
  },
  {
    toLink: "subcategory",
    icon: <AutoAwesomeMosaicIcon fontSize="small" />,
    linkText: "Manage Subcategories",
  },
  {
    toLink: "coupon",
    icon: <DiscountIcon fontSize="small" />,
    linkText: "Manage Coupons",
  },
  {
    toLink: "chat",
    icon: <ChatIcon fontSize="small" />,
    linkText: "Sellers Chat",
  },
  {
    toLink: "profile",
    icon: <PasswordIcon fontSize="small" />,
    linkText: "Manage Profile",
  },
];

const sellerLinks = [
  {
    toLink: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    linkText: "Dashboard",
  },
  {
    toLink: "orders",
    icon: <ArticleIcon fontSize="small" />,
    linkText: "Orders",
  },
  {
    toLink: "shop",
    icon: <ListAltIcon fontSize="small" />,
    linkText: "Shop",
  },
  {
    toLink: "product",
    icon: <GradientIcon fontSize="small" />,
    linkText: "Manage Product",
  },
  {
    toLink: "products",
    icon: <PhoneAndroidIcon fontSize="small" />,
    linkText: "Manage Products",
  },
  {
    toLink: "chat-admin",
    icon: <ChatIcon fontSize="small" />,
    linkText: "Admin Chat",
  },
  {
    toLink: "chat",
    icon: <ChatIcon fontSize="small" />,
    linkText: "Buyers Chat",
  },
  {
    toLink: "profile",
    icon: <PasswordIcon fontSize="small" />,
    linkText: "Manage Profile",
  },
];

const buyerLinks = [
  {
    toLink: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    linkText: "Dashboard",
  },
  {
    toLink: "orders",
    icon: <ArticleIcon fontSize="small" />,
    linkText: "Orders",
  },
  {
    toLink: "wishlist",
    icon: <ListAltIcon fontSize="small" />,
    linkText: "Manage Wishlist",
  },
  {
    toLink: "chat",
    icon: <ChatIcon fontSize="small" />,
    linkText: "Sellers Chat",
  },
  {
    toLink: "profile",
    icon: <PasswordIcon fontSize="small" />,
    linkText: "Manage Profile",
  },
];

export const roleLinks = {
  admin: adminLinks,
  seller: sellerLinks,
  buyer: buyerLinks,
};
