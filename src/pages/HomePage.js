import noImg from "../img/no-image.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BlogActions } from "../redux/actions/blog.action";
import SideBar from "../components/SideBar";
import PaginationBar from "../components/PaginationBar";
import Moment from "react-moment";

const HomePage = () => {
  let dispatch = useDispatch();
  const blogList = useSelector((state) => state.blog.blogs.data);
  const currentPage = useSelector((state) => state.blog.currentPage);
  const [random, setRandom] = useState(null);
  const [quote, setQuote] = useState(null);
  console.log(blogList);

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 20));
    dispatch(BlogActions.getBlog(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const getQuote = async () => {
      const url = `https://quote-garden.herokuapp.com/api/v3/quotes/random`;
      const res = await fetch(url);
      const data = await res.json();
      setQuote(data.data);
    };
    getQuote();
  }, []);

  return (
    <div id="wrap">
      <main>
        <section className={`first-view first-view--${random}`}>
          <div className="container">
            <div className="first-view__quote">
              <h2 className="title">{quote && quote[0].quoteText}</h2>
              <h4 className="author">{quote && quote[0].quoteAuthor}</h4>
              <a href="#main-content" className="first-view__btn not-hover">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                See posts
              </a>
            </div>
          </div>
        </section>
        <section id="main-content" className="main-content">
          <div className="container container--small">
            <div className="blogs">
              <ul className="blogs__list">
                {blogList &&
                  blogList.data.blogs.map((blog) => (
                    <li key={blog._id}>
                      <Link to={`/${blog._id}`} className="not-hover">
                        <div className="author">
                          {blog.author.avatarUrl ? (
                            <div
                              className="author__avatar"
                              style={{
                                backgroundImage: `url('${blog.author.avatarUrl}')`,
                              }}
                            ></div>
                          ) : (
                            <div className="author__avatar author__avatar--no-img"></div>
                          )}
                          <div className="author__username">
                            {blog.author.name}
                          </div>
                        </div>
                        <div className="img">
                          {blog.images && blog.images ? (
                            <div className="img__item">
                              <img src={blog.images} alt={blog.title} />
                            </div>
                          ) : (
                            <div className="img__item img__item--no-img">
                              <img src={noImg} alt={blog.title} />
                            </div>
                          )}
                        </div>
                        <div className="info">
                          <div className="info__icon"></div>
                          <div className="info__content">
                            <div className="title">
                              <strong>{blog.author.name}</strong>
                              <span>{blog.title}</span>
                            </div>
                            <div className="des">{blog.content}</div>
                            <div className="time">
                              <Moment fromNow>{blog.createdAt}</Moment>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
              <PaginationBar
                currentPage={currentPage}
                totalPage={blogList && blogList.data.totalPages}
                user={false}
              />
            </div>
            <SideBar />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
