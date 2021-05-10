import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BlogActions } from "../redux/actions/blog.action";
import Moment from "react-moment";
import PaginationBar from "../components/PaginationBar";

const BlogsPage = () => {
  let dispatch = useDispatch();
  const blogList = useSelector((state) => state.blog.blogs.data);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const currentPage = useSelector((state) => state.blog.currentPage);
  const [keyword, setKeyword] = useState();
  console.log(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(BlogActions.searchBlog(currentPage, keyword));
  };

  const handleChecked = (e) => {
    console.log(e.target);
    if (e.target.checked) {
      dispatch(BlogActions.filterBlog(currentPage, currentUser.data._id));
    } else {
      dispatch(BlogActions.getBlog(currentPage));
    }
  };

  useEffect(() => {
    dispatch(BlogActions.getBlog(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div id="add-blog" className="add-blog">
      <div className="container container--large">
        <div className="add-blog__title add-blog__title--form">
          <span>Blog Manage</span>
          <label>
            My Blogs only
            <input
              type="checkbox"
              name="checkedUser"
              onChange={handleChecked}
            />
            <span></span>
          </label>
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
              <div className="title">Title</div>
              <div className="author">Author</div>
              <div className="review">Reviews</div>
              <div className="time">Time</div>
              <div className="manage">Manage</div>
            </li>
            {blogList &&
              blogList.data.blogs.map((blog) => (
                <li key={blog._id}>
                  <div className="title">
                    <Link to={`/${blog._id}`}>{blog.title}</Link>
                  </div>
                  <div className="author">{blog.author.name}</div>
                  <div className="review">{blog.reviewCount}</div>
                  <div className="time">
                    <Moment fromNow>{blog.createdAt}</Moment>
                  </div>
                  <div className="manage">
                    {currentUser &&
                    currentUser.data.name === blog.author.name ? (
                      <Link to={`/edit/${blog._id}`} className="not-hover">
                        Edit
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              ))}
          </ul>
          <PaginationBar
            currentPage={currentPage}
            totalPage={blogList && blogList.data.totalPages}
            user={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
