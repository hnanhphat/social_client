import api from "../../apiService";

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

const searchAllUser = (currentPage, keyword) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCHALLUSER_REQUEST_START", payload: null });
    const data = await api.get(
      `/users?page=${currentPage}&limit=10&name[$regex]=${keyword}&name[$options]=i&sortBy[email]=1`
    );
    dispatch({
      type: "SEARCHALLUSER_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage },
    });
  } catch (error) {
    dispatch({ type: "SEARCHALLUSER_REQUEST_FAIL", payload: error.message });
  }
};

const sendRequest = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: "SEND_REQUEST_START" });
    const data = await api.post(`/friends/add/${id}`);
    console.log(data);
    dispatch({ type: "SEND_REQUEST_SUCCESS", payload: "requesting" });
  } catch (error) {
    dispatch({ type: "SEND_REQUEST_FAIL", payload: error.message });
  }
};

const cancelRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CANCEL_REQUEST_START" });
    const data = await api.delete(`/friends/add/${id}`);
    console.log(data);
    dispatch({ type: "CANCEL_REQUEST_SUCCESS", payload: "cancel" });
  } catch (error) {
    dispatch({ type: "CANCEL_REQUEST_FAIL", payload: error.message });
  }
};

const receivedRequest = () => async (dispatch) => {
  try {
    dispatch({ type: "RECEIVED_REQUEST_START" });
    const data = await api.get(`/friends/manage`);
    dispatch({ type: "RECEIVED_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "RECEIVED_REQUEST_FAIL", payload: error.message });
    console.log(error.message);
  }
};

const acceptRequest = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: "ACCEPT_REQUEST_START" });
    const data = await api.post(`/friends/manage/${id}`);
    dispatch({ type: "ACCEPT_REQUEST_SUCCESS", payload: "accepted" });
  } catch (error) {
    dispatch({ type: "ACCEPT_REQUEST_FAIL", payload: error.message });
    console.log(error.message);
  }
};

const declineRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DECLINE_REQUEST_START" });
    const data = await api.delete(`/friends/manage/${id}`);
    dispatch({ type: "DECLINE_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLINE_REQUEST_FAIL", payload: error.message });
    console.log(error.message);
  }
};

export const friendActions = {
  getAllUser,
  searchAllUser,
  sendRequest,
  cancelRequest,
  receivedRequest,
  acceptRequest,
  declineRequest,
};
