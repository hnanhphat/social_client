import noImg from "../img/no-image.png";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.action";
import { friendActions } from "../redux/actions/friends.action";
import PaginationBar from "../components/PaginationBar";

const FriendsPage = () => {
  let dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const currentPage = useSelector((state) => state.friends.currentPage);
  const allUser = useSelector((state) => state.friends.friends.data);
  const friendsRequest = useSelector((state) => state.friends.friendsRequest);
  const [keyword, setKeyword] = useState();
  console.log(currentUser);
  console.log(allUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(friendActions.searchAllUser(currentPage, keyword));
  };

  const handleSend = (id) => {
    dispatch(friendActions.sendRequest(id));
  };

  const handleCancel = (id) => {
    dispatch(friendActions.cancelRequest(id));
  };

  useEffect(() => {
    dispatch(friendActions.getAllUser(currentPage));
  }, [dispatch, currentPage, friendsRequest]);

  return (
    <div id="add-blog" className="add-blog">
      <div className="container container--large">
        <div className="add-blog__title add-blog__title--form">
          <span>Friends Manage</span>
          <form onSubmit={handleSubmit}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="svg-inline--fa fa-search fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
            <input
              type="text"
              name="searchInput"
              placeholder="Search ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </div>
        <div className="add-blog__blogs">
          <ul className="list">
            <li>
              <div className="review">Avatar</div>
              <div className="author">Name</div>
              <div className="title">Email</div>
              <div className="time">Friends</div>
              <div className="manage">Manage</div>
            </li>
            {allUser &&
              allUser.data.users.map((user) => (
                <li
                  key={user._id}
                  className={
                    currentUser && currentUser.data._id === user._id
                      ? "current"
                      : ""
                  }
                >
                  <div className="review review--center">
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
                  </div>
                  <div className="author">{user.name}</div>
                  <div className="title">{user.email}</div>
                  <div className="time">{user.friendCount}</div>
                  <div className="manage manage--center">
                    {user.friendship &&
                    user.friendship.status === "accepted" ? (
                      "Friend"
                    ) : user.friendship &&
                      user.friendship.status === "requesting" ? (
                      <button onClick={() => handleCancel(user._id)}>
                        Cancel
                      </button>
                    ) : user.friendship &&
                      user.friendship.status === "cancel" ? (
                      <button onClick={() => handleSend(user._id)}>
                        Add Friend
                      </button>
                    ) : (
                      <button onClick={() => handleSend(user._id)}>
                        Add Friend
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
          <PaginationBar
            currentPage={currentPage}
            totalPage={allUser && allUser.data.totalPages}
            user={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
