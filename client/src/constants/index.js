export const NAV_LINKS = {
  ROOT: { ROUTE: '/', LABEL: 'Home' },
  REGISTER: { ROUTE: '/register', LABEL: 'Register' },
  LOGIN: { ROUTE: '/login', LABEL: 'Login' },
  REGISTER_COMPLETE: {
    ROUTE: '/register-complete',
    LABEL: 'Register Complete',
  },
  FORGOT_PASSWORD: { ROUTE: '/forgot-password', LABEL: 'Forgot Password' },
  SHOP: { ROUTE: '/shop', LABEL: 'Shop' },
  CART: { ROUTE: '/cart', LABEL: 'Cart' },
  PAYMENT: { ROUTE: '/payment', LABEL: 'Payment' },
  CHECKOUT: { ROUTE: '/checkout', LABEL: 'Checkout' },
  PRODUCT: { ROUTE: '/product', LABEL: 'Product' },
  CATEGORY: { ROUTE: '/category', LABEL: 'Category' },
  SUBCATEGORY: { ROUTE: '/subcategory', LABEL: 'Subcategory' },
  USER_HISTORY: { ROUTE: '/user/history', LABEL: 'History' },
  USER_PASSWORD: { ROUTE: '/user/password', LABEL: 'Password' },
  USER_WISHLIST: { ROUTE: '/user/wishlist', LABEL: 'Wishlist' },
  ADMIN_DASHBOARD: { ROUTE: '/admin/dashboard', LABEL: 'History' },
  ADMIN_PRODUCT: { ROUTE: '/admin/product', LABEL: 'Product' },
  ADMIN_PRODUCTS: { ROUTE: '/admin/products', LABEL: 'Products' },
  ADMIN_CATEGORY: { ROUTE: '/admin/category', LABEL: 'Category' },
  ADMIN_SUBCATEGORY: { ROUTE: '/admin/subcategory', LABEL: 'Subcategory' },
  ADMIN_COUPON: { ROUTE: '/admin/coupon', LABEL: 'Coupon' },

  SLUG: { ROUTE: '/:slug', LABEL: null },
};

export const JUMBOTRON_TEXTS = [
  'Latest Products',
  'New Arrivals',
  'Best Sellers',
];

export const HOME_PAGE_CARDS_COUNT = 3;

export const PRODUCT_TYPES_FETCH = {
  ALL: 'all',
  NEWEST: 'newest',
  BESTSELLING: 'bestselling',
};
