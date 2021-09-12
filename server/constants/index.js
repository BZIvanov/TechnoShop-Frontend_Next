const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

const MODELS = {
  USER: 'User',
  PRODUCT: 'Product',
  CART: 'Cart',
  CATEGORY: 'Category',
  SUB_CATEGORY: 'SubCategory',
  COUPON: 'Coupon',
  ORDER: 'Order',
  WISHLIST: 'Wishlist',
};

const ORDER_STATUSES = {
  NOT_PROCESSED: 'Not Processed',
  CASH_ON_DELIVERY: 'Cash On Delivery',
  PROCESSING: 'Processing',
  DISPATCHED: 'Dispatched',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};

const YES_NO = {
  YES: 'Yes',
  NO: 'No',
};

const COLORS = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

const BRANDS = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'];

module.exports = {
  USER_ROLES,
  MODELS,
  ORDER_STATUSES,
  YES_NO,
  COLORS,
  BRANDS,
};
