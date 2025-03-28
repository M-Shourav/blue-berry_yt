import { sanityFetch } from "../lib/live";
import {
  CATEGORIES_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_CATEGORIES_PRODUCT,
  PRODUCT_QUERY,
  PRODUCT_SEARCH_QUERY,
  PRODUCT_SLUG_QUERY,
  SALES_QUERY,
} from "./queries";

export const getSales = async () => {
  try {
    const products = await sanityFetch({
      query: SALES_QUERY,
    });
    return products?.data || [];
  } catch (error) {
    console.log("Error sales data:", error);
    return [];
  }
};

export const getProduct = async () => {
  try {
    const productData = await sanityFetch({
      query: PRODUCT_QUERY,
    });
    return productData.data || [];
  } catch (error) {
    console.log("product fetching Error data:", error);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.log("all categories fetching error data:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.log("slug fetching error data:", error);
    return null;
  }
};

export const getSearchProductQuery = async (searchParam: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: searchParam,
      },
    });
    return product?.data || [];
  } catch (error) {
    console.log("search product fetching error data:", error);
    return [];
  }
};

export const getAllProductCategories = async (categorySlug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORIES_PRODUCT,
      params: {
        categorySlug,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.log(" product categories fetching error data:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User is required!");
  }
  try {
    const order = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return order.data || [];
  } catch (error) {
    console.log("Error order data:", error);
    return [];
  }
};
