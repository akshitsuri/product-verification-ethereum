import { createSlice } from "@reduxjs/toolkit";
import isEmpty from "../utils/is-empty";
import setAuthToken from "../utils/setAuthToken";
import * as REQUESTS from "../api/auth";
import { setAlert } from "./alert";
import { setLoading, clearLoading } from "./loading";
import { LOGIN } from "../constants/routes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload.data;
    },
    setToken(state, action) {
      state.isAuthenticated = !isEmpty(action.payload);
      state.token = action.payload;
    },
    authFailure(state, action) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;

      state.error = action.payload ? action.payload : "Could not connect";
    },
    setLogout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCurrentUser, authFailure, setToken, setLogout } =
  authSlice.actions;

export default authSlice.reducer;

// thunks

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await REQUESTS.getMe();
    dispatch(clearLoading());
    dispatch(setCurrentUser(res));
  } catch (err) {
    dispatch(clearLoading());
    dispatch(authFailure(err.response.data.error));
  }
};

//register student
export const register = (formData, history) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await REQUESTS.register(formData);
    dispatch(clearLoading());
    const { success } = res;
    if (success) {
      dispatch(setAlert("Registered Successfully!", "success"));
      history.push(LOGIN);
    }
  } catch (err) {
    dispatch(clearLoading());
    dispatch(setAlert(err.response.data.error, "error"));
    //dispatch(authFailure(err.response.data.error));
  }
};

//login
export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const res = await REQUESTS.login(formData);

    dispatch(clearLoading());
    const { success, token } = res;
    if (success) {
      // Setting token to authorisation header in axios
      await setAuthToken(token);

      dispatch(loadUser());
      dispatch(setToken(token));
      dispatch(setAlert("Logged in Successfully!", "success"));
    }
  } catch (err) {
    dispatch(clearLoading());
    dispatch(setAlert(err.response.data.error, "error"));
    dispatch(authFailure(err.response.data.error));
  }
};

// update user details
export const updateDetails = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const data = await REQUESTS.updateDetails(formData);
    dispatch(clearLoading());
    const { success } = data;

    if (success) {
      dispatch(loadUser());
      dispatch(setAlert("Updated details successfully!", "success"));
    }
  } catch (err) {
    dispatch(clearLoading());
    dispatch(setAlert(err.response.data.error, "error"));
    dispatch(authFailure(err.response.data.error));
  }
};

// update user password
export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const data = await REQUESTS.updatePassword(formData);
    dispatch(clearLoading());
    const { success } = data;

    if (success) {
      dispatch(loadUser());
      dispatch(setAlert("Updated password successfully!", "success"));
    }
  } catch (err) {
    dispatch(clearLoading());
    dispatch(setAlert(err.response.data.error, "error"));
    dispatch(authFailure(err.response.data.error));
  }
};

//logout
export const logout = () => async (dispatch) => {
  dispatch(setLogout());
  await REQUESTS.logout();
  dispatch(setAlert("Logged out successfully", "success"));
};
