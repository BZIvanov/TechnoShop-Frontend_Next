import { actionType } from '../action-types';

const initialState = {
  allProducts: { products: [], totalCount: 0 },
  newestProducts: { products: [], totalCount: 0 },
  bestsellingProducts: { products: [], totalCount: 0 },
  selectedProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: {
          totalCount: action.payload.totalCount,
          products: action.payload.products,
        },
      };
    case actionType.GET_NEWEST_PRODUCTS:
      return {
        ...state,
        newestProducts: {
          totalCount: action.payload.totalCount,
          products: action.payload.products,
        },
      };
    case actionType.GET_BESTSELLING_PRODUCTS:
      return {
        ...state,
        bestsellingProducts: {
          totalCount: action.payload.totalCount,
          products: action.payload.products,
        },
      };
    case actionType.GET_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case actionType.CREATE_PRODUCT:
      return {
        ...state,
        allProducts: {
          products: [...state.allProducts.products, action.payload],
          totalCount: state.allProducts.totalCount + 1,
        },
      };
    case actionType.UPDATE_PRODUCT:
      const untouchedProducts = state.allProducts.products.filter(
        (product) => product._id !== action.payload._id
      );
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          products: [...untouchedProducts, action.payload],
        },
      };
    case actionType.REMOVE_PRODUCT:
      const filteredProducts = state.allProducts.products.filter(
        (product) => product.slug !== action.payload
      );
      return {
        ...state,
        allProducts: {
          products: filteredProducts,
          totalCount: state.allProducts.totalCount - 1,
        },
      };
    default:
      return state;
  }
};
