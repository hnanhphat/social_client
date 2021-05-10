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

export const authActions = { loginUser, registerUser, logoutUser };
