import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getAllUserProducts,
  getLatestProducts,
  showProduct,
  updateProduct
} from "../../api/product";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    return await getAllProducts();
  }
);

export const getUserProducts = createAsyncThunk(
  "product/getUserProducts",
  async (id) => {
    return await getAllUserProducts(id);
  }
);

export const latestProducts = createAsyncThunk(
  "product/latestProducts",
  async () => {
    return await getLatestProducts();
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id) => {
    return await showProduct(id);
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    const token = localStorage.getItem('token');
    return await addProduct(data, token);
  }
);

export const changeProduct = createAsyncThunk(
  "product/changeProduct",
  async (data) => {
    return await updateProduct(data);
  }
);

export const destroyProduct = createAsyncThunk(
  "product/destroyProduct",
  async (id) => {
    const token = localStorage.getItem('token')
    return await deleteProduct(id, token);
  }
);

export const deleteProductFromList = createAsyncThunk(
  "product/deleteProductFromList",
  async (id) => {
    return id
  }
);

