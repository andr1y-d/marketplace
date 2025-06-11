import { createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  getUserProducts,
  getProduct,
  createProduct,
  changeProduct,
  destroyProduct,
  latestProducts,
  deleteProductFromList,
} from './productThunks';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    userProducts: [],
    latest: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.products = [];
      })

      .addCase(getUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userProducts = [];
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.userProducts = [];
      })

      .addCase(latestProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.latest = [];
      })
      .addCase(latestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.latest = action.payload.data;
      })
      .addCase(latestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.latest = [];
      })

      .addCase(getProduct.pending, (state, action) => {
        state.product = null;
        state.loading = true;
        state.product = {};
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.userProducts.push(action.payload);
      })

      .addCase(changeProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        state.products = state.products.map(p => p.id === updated.id ? updated : p);
        state.userProducts = state.userProducts.map(p => p.id === updated.id ? updated : p);
        if (state.selectedProduct?.id === updated.id) {
          state.selectedProduct = updated;
        }
      })


      .addCase(destroyProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(destroyProduct.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.products = state.products.filter(p => p.id !== id);
        state.userProducts = state.userProducts.filter(p => p.id !== id);
        if (state.selectedProduct?.id === id) {
          state.selectedProduct = null;
        }
      })

      .addCase(deleteProductFromList.fulfilled, (state, action) => {
        const id = action.payload;
        state.products = state.products.filter(p => p.id !== id);
      })
  }
});

export default productSlice.reducer;
