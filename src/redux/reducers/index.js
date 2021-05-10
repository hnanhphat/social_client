import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import blogReducer from "./blog.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";
import friendsReducer from "./friends.reducer";

export default combineReducers({
  auth: authReducer,
  blog: blogReducer,
  route: routeReducer,
  user: userReducer,
  friends: friendsReducer,
});
