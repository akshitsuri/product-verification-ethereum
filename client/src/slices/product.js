import { createSlice } from "@reduxjs/toolkit";
import * as REQUESTS from "../api/product";
import { setLoading, clearLoading } from "./loading";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

const initialState = {
  addedProduct: null,
  removedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAddedProduct(state, action) {
      state.addedProduct = action.payload;
    },
    setRemovedProduct(state, action) {
      state.removedProduct = action.payload;
    },
  },
});

export const { setAddedProduct, setRemovedProduct } = productSlice.actions;

export default productSlice.reducer;

// Thunk

export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await REQUESTS.addProduct(product);
    dispatch(clearLoading());
    const { success } = res;
    dispatch(setAddedProduct(product));
    dispatch(loadUser());
  } catch (err) {
    dispatch(clearLoading());
    dispatch(setAlert(err.response.data.error, "error"));
  }
};

export const removeProduct = (product) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await REQUESTS.removeProduct(product);
    dispatch(clearLoading());
    const { success } = res;
    dispatch(setRemovedProduct(product));
    dispatch(setAlert("Product deleted", "success"));
    dispatch(loadUser());
  } catch (err) {
    dispatch(clearLoading());
    dispatch(setAlert(err.response.data.error, "error"));
  }
};
