import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertReducer(state, action) {
      return [...state, action.payload];
    },
    removeAlertReducer(state, action) {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlertReducer, removeAlertReducer } = alertSlice.actions;

export default alertSlice.reducer;

// Thunk
export const setAlert = (msg, alertType) => async (dispatch) => {
  const id = uuid();
  dispatch(setAlertReducer({ msg, alertType, id }));

  setTimeout(() => {
    dispatch(removeAlertReducer(id));
  }, 3000);
};
