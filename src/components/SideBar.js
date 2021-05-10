import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImg from "../img/no-image.png";
import { Link } from "react-router-dom";
import { userActions } from "../redux/actions/user.action";
import { friendActions } from "../redux/actions/friends.action";
import { authActions } from "../redux/actions/auth.action";

const SideBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const receivedRequest = useSelector((state) => state.friends.received.data);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logoutUser());
  };

  const handleAccept = (id) => {
    dispatch(friendActions.acceptRequest(id));
  };

  const handleDecline = (id) => {
    dispatch(friendActions.declineRequest(id));
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(userActions.getUser());
      dispatch(friendActions.receivedRequest());
    }
  }, [dispatch]);

  return (
    <nav id="sidebar" className="sidebar">
      {isAuth ? (
        <div className="sidebar__content">
          <div className="author">
            {currentUser && currentUser.data.avatarUrl ? (
              <div
                className="author__avatar"
                style={{
                  backgroundImage: `url('${currentUser.data.avatarUrl}')`,
                }}
              ></div>
            ) : (
              <div
                className="author__avatar"
                style={{ backgroundImage: `url('${noImg}')` }}
              ></div>
            )}
            <div className="author__info">
              <h3>{currentUser && currentUser.data.name}</h3>
              <p>{currentUser && currentUser.data.email}</p>
            </div>
            <button className="author__btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          {receivedRequest && receivedRequest.data.users.length ? (
            <div className="friends">
              <h3 className="friends__title">Received Requests</h3>
              <ul className="friends__list">
                {receivedRequest &&
                  receivedRequest.data.users.map((user) => (
                    <li key={user._id}>
                      {user.avatarUrl ? (
                        <div
                          className="avatar"
                          style={{
                            backgroundImage: `url('${user.avatarUrl}')`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="avatar"
                          style={{ backgroundImage: `url('${noImg}')` }}
                        ></div>
                      )}
                      <div className="username">{user.name}</div>
                      <div className="btns">
                        <button onClick={() => handleAccept(user._id)}>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="check-circle"
                            className="svg-inline--fa fa-check-circle fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
                            ></path>
                          </svg>
                        </button>
                        <button onClick={() => handleDecline(user._id)}>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="times-circle"
                            className="svg-inline--fa fa-times-circle fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Link to="/login" className="sidebar__not-login not-hover">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="frown"
            className="svg-inline--fa fa-frown fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
            ></path>
          </svg>
          <p>Please login to see info!</p>
        </Link>
      )}
    </nav>
  );
};

export default SideBar;
