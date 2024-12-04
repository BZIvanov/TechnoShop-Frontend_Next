import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DiscountIcon from '@mui/icons-material/Discount';
import ChatIcon from '@mui/icons-material/Chat';
import PasswordIcon from '@mui/icons-material/Password';

const adminLinks = [
  {
    toLink: 'dashboard',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Dashboard',
  },
  {
    toLink: 'orders',
    icon: <ArticleIcon fontSize='small' />,
    linkText: 'Manage Orders',
  },
  {
    toLink: 'shops',
    icon: <BusinessIcon fontSize='small' />,
    linkText: 'Manage Shops',
  },
  {
    toLink: 'category',
    icon: <CategoryIcon fontSize='small' />,
    linkText: 'Manage Categories',
  },
  {
    toLink: 'subcategory',
    icon: <AutoAwesomeMosaicIcon fontSize='small' />,
    linkText: 'Manage Subcategories',
  },
  {
    toLink: 'coupon',
    icon: <DiscountIcon fontSize='small' />,
    linkText: 'Manage Coupons',
  },
  {
    toLink: 'chat',
    icon: <ChatIcon fontSize='small' />,
    linkText: 'Sellers Chat',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Manage Profile',
  },
];

const sellerLinks = [
  {
    toLink: 'dashboard',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Dashboard',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Manage Profile',
  },
];

const buyerLinks = [
  {
    toLink: 'dashboard',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Dashboard',
  },
  {
    toLink: 'wishlist',
    icon: <ListAltIcon fontSize='small' />,
    linkText: 'Manage Wishlist',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Manage Profile',
  },
];

export const roleLinks = {
  admin: adminLinks,
  seller: sellerLinks,
  buyer: buyerLinks,
};
