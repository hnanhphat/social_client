import api from "../../apiService";
import { routeActions } from "./route.action";

const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST_START", payload: null });
    const res = await api.post("/auth/login", data);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch(routeActions.redirect("/"));
    dispatch({
      type: "LOGIN_REQUEST_SUCCESS",
      payload: res.data.data.accessToken,
    });
  } catch (error) {
    dispatch({ type: "LOGIN_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const loginWithFb = (access_token) => async (dispatch) => {
  dispatch({ type: "LOGIN_FACEBOOK_REQUEST", payload: null });
  try {
    console.log("Doing");
    console.log(access_token);
    const res = await api.post("/auth/login/facebook", { access_token });
    const name = res.data.data.user.name;
    console.log(res);
    dispatch({ type: "LOGIN_FACEBOOK_SUCCESS", payload: res.data.data });
    localStorage.setItem("accessToken", res.data.data.accessToken);
    api.defaults.headers["authorization"] =
      "Bearer " + res.data.data.accessToken;
    dispatch(routeActions.redirect("/"));
  } catch (error) {
    console.log("Fail");
    console.error(error);
    dispatch({ type: "LOGIN_FACEBOOK_FAILURE", payload: null });
  }
};

const loginWithGg = (access_token) => async (dispatch) => {
  dispatch({ type: "LOGIN_GOOGLE_REQUEST", payload: null });
  try {
    console.log("Doing");
    const res = await api.post("/auth/login/google", { access_token });
    const name = res.data.data.user.name;
    console.log(res);
    dispatch({ type: "LOGIN_GOOGLE_SUCCESS", payload: res.data.data });
    localStorage.setItem("accessToken", res.data.data.accessToken);
    api.defaults.headers["authorization"] =
      "Bearer " + res.data.data.accessToken;
    dispatch(routeActions.redirect("/"));
  } catch (error) {
    console.log("Fail");
    dispatch({ type: "LOGIN_GOOGLE_FAILURE", payload: null });
  }
};

const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST_START", payload: null });
    const res = await api.post("/users", data);
    console.log(res);
    dispatch(routeActions.redirect("/login"));
    dispatch({ type: "REGISTER_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "REGISTER_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST_START", payload: null });
    dispatch(routeActions.redirect("/login"));
    dispatch({ type: "LOGOUT_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "LOGOUT_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

export const authActions = {
  loginUser,
  loginWithFb,
  loginWithGg,
  registerUser,
  logoutUser,
};
