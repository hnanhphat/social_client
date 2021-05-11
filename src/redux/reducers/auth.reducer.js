const initialState = {
  isAuth: localStorage.getItem("accessToken"),
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_REQUEST_START":
    case "LOGIN_FACEBOOK_REQUEST":
    case "LOGIN_GOOGLE_REQUEST":
    case "REGISTER_REQUEST_START":
    case "LOGOUT_REQUEST_START":
      state.loading = true;
      break;
    case "LOGIN_REQUEST_FAIL":
    case "LOGIN_FACEBOOK_FAILURE":
    case "LOGIN_GOOGLE_FAILURE":
    case "REGISTER_REQUEST_FAIL":
    case "LOGOUT_REQUEST_FAIL":
      state.loading = false;
      // set the error message
      break;
    case "LOGIN_REQUEST_SUCCESS":
    case "LOGIN_FACEBOOK_SUCCESS":
    case "LOGIN_GOOGLE_SUCCESS":
      state.loading = false;
      state.isAuth = payload;
      break;
    case "REGISTER_REQUEST_SUCCESS":
      state.loading = false;
      console.log("success!!!");
      break;
    case "LOGOUT_REQUEST_SUCCESS":
      state.isAuth = "";
      state.loading = false;
      break;
    default:
      break;
  }
  return { ...state };
};

export default authReducer;
