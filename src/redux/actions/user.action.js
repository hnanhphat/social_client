import api from "../../apiService";

const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: "GETUSER_REQUEST_START", payload: null });
    const data = await api.get("/users/me");
    console.log(data);
    dispatch({ type: "GETUSER_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GETUSER_REQUEST_FAIL", payload: error.message });
  }
};

const editUser = ({ name, avatarUrl }) => async (dispatch) => {
  try {
    dispatch({ type: "EDITUSER_REQUEST_START", payload: null });
    const data = await api.put("/users", { name, avatarUrl });
    dispatch({ type: "EDITUSER_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "EDITUSER_REQUEST_FAIL", payload: error.message });
  }
};

const getAllUser = (currentPage) => async (dispatch) => {
  try {
    dispatch({ type: "GETALLUSER_REQUEST_START", payload: null });
    const data = await api.get(`/users?page=${currentPage}&limit=10`);
    dispatch({
      type: "GETALLUSER_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage },
    });
  } catch (error) {
    dispatch({ type: "GETALLUSER_REQUEST_FAIL", payload: error.message });
  }
};

export const userActions = { getUser, editUser, getAllUser };
