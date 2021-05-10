const initialState = {
  friends: [],
  error: "",
  loading: false,
  received: [],
  friendsRequest: "",
  currentPage: 1,
};

const friendsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GETALLUSER_REQUEST_START":
    case "SEARCHALLUSER_REQUEST_START":
    case "SEND_REQUEST_START":
    case "CANCEL_REQUEST_START":
    case "RECEIVED_REQUEST_START":
    case "ACCEPT_REQUEST_START":
    case "DECLINE_REQUEST_START":
      state.loading = true;
      break;
    case "GETALLUSER_REQUEST_FAIL":
    case "SEARCHALLUSER_REQUEST_FAIL":
    case "SEND_REQUEST_FAIL":
    case "CANCEL_REQUEST_FAIL":
    case "RECEIVED_REQUEST_FAIL":
    case "ACCEPT_REQUEST_FAIL":
    case "DECLINE_REQUEST_FAIL":
      state.friendsRequest = "";
      state.error = payload;
      state.loading = false;
      break;
    case "GETALLUSER_REQUEST_SUCCESS":
      state.friends = payload.data;
      state.currentPage = payload.currentPage;
      state.loading = false;
      break;
    case "SEARCHALLUSER_REQUEST_SUCCESS":
      state.friends = payload.data;
      state.currentPage = payload.currentPage;
      state.loading = false;
      break;
    case "SEND_REQUEST_SUCCESS":
      state.friendsRequest = payload;
      state.loading = false;
      break;
    case "CANCEL_REQUEST_SUCCESS":
      state.friendsRequest = payload;
      state.loading = false;
      break;
    case "ACCEPT_REQUEST_SUCCESS":
      state.friendsRequest = payload;
      state.loading = false;
      break;
    case "DECLINE_REQUEST_SUCCESS":
      state.friendsRequest = payload;
      state.loading = false;
      break;
    case "RECEIVED_REQUEST_SUCCESS":
      state.received = payload;
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default friendsReducer;
