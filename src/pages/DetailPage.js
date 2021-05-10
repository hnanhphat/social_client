import noImg from "../img/no-image.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { BlogActions } from "../redux/actions/blog.action";
import { routeActions } from "../redux/actions/route.action";
import Moment from "react-moment";

const DetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const singleBlog = useSelector((state) => state.blog.singleBlog.data);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const imgHeight = document.getElementById("img-item");
  console.log(singleBlog);

  const checkLogin = localStorage.getItem("accessToken");
  const [update, setUpdate] = useState({});
  const [content, setContent] = useState({ content: "" });
  const [reactions, setReactions] = useState({
    targetType: "Blog",
    targetId: id,
    emoji: "",
  });

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleReaction = (e) => {
    const { targetType, targetId, emoji } = { ...reactions, emoji: e };
    dispatch(BlogActions.postReaction({ targetType, targetId, emoji }));
    dispatch(BlogActions.getSingleBlog(id));
    setUpdate({ ...content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(BlogActions.postReview({ content }, id));
    dispatch(BlogActions.getSingleBlog(id));
    setUpdate({ ...content });
    e.target.reset();
  };

  const handleDelete = () => {
    dispatch(BlogActions.deleteBlog(id));
  };

  useEffect(() => {
    dispatch(BlogActions.getSingleBlog(id));
    dispatch(BlogActions.getReviews(id));
  }, [id, dispatch, imgHeight, update]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [redirectTo, history]);

  return (
    <div id="blog-detail" className="blog-detail">
      <div className="container container--small">
        <div className="blog-detail__img">
          {singleBlog && singleBlog.data.images ? (
            <div id="img-item" className="img__item">
              <img
                src={singleBlog && singleBlog.data.images}
                alt={singleBlog && singleBlog.data.title}
              />
            </div>
          ) : (
            <div id="img-item" className="img__item img__item--no-img">
              <img src={noImg} alt={singleBlog && singleBlog.data.title} />
            </div>
          )}
        </div>
        <div
          className="blog-detail__content"
          style={{ height: imgHeight && imgHeight.clientHeight }}
        >
          <div className="author">
            {singleBlog && singleBlog.data.author.avatarUrl ? (
              <div
                className="author__avatar"
                style={{
                  backgroundImage: `url('${
                    singleBlog && singleBlog.data.author.avatarUrl
                  }')`,
                }}
              ></div>
            ) : (
              <div
                className="author__avatar"
                style={{ backgroundImage: `url('${noImg}')` }}
              ></div>
            )}
            <h3 className="author__username">
              {singleBlog && singleBlog.data.author.name}
            </h3>
            <div className="author__edit">
              <div className="icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="ellipsis-v"
                  className="svg-inline--fa fa-ellipsis-v fa-w-6"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192 512"
                >
                  <path
                    fill="currentColor"
                    d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                  ></path>
                </svg>
              </div>
              <div className="dropdown">
                <Link to={`/edit/${id}`} className="not-hover">
                  Edit
                </Link>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
          <ul className="histories">
            {singleBlog &&
              singleBlog.data.reviews.map((review) => (
                <li key={review._id}>
                  {review.author.avatarUrl ? (
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: `url('${review.author.avatarUrl}')`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className="avatar"
                      style={{ backgroundImage: `url('${noImg}')` }}
                    ></div>
                  )}
                  <div className="comment">
                    <strong>{review.author.name}</strong>
                    <span>{review.content}</span>
                  </div>
                </li>
              ))}
          </ul>
          <div className="reactions">
            <div className="icon">
              <div className="icon__show">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="heart"
                  className="svg-inline--fa fa-heart fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                  ></path>
                </svg>
              </div>
              <div className="icon__hover">
                <button onClick={() => handleReaction("like")}>
                  <span>{singleBlog && singleBlog.data.reactions.like}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="url(#paintLike_linear)"
                      d="M8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0Z"
                    />
                    <path
                      fill="#fff"
                      d="M12.162 7.338C12.338 7.461 12.5 7.583 12.5 8.012C12.5 8.442 12.271 8.616 12.026 8.737C12.1261 8.90028 12.1581 9.09637 12.115 9.283C12.038 9.627 11.723 9.894 11.443 9.973C11.564 10.167 11.602 10.358 11.458 10.593C11.273 10.888 11.112 11 10.4 11H7.5C6.512 11 6 10.454 6 10V7.665C6 6.435 7.467 5.39 7.467 4.535L7.361 3.47C7.356 3.405 7.369 3.246 7.419 3.2C7.499 3.121 7.72 3 8.054 3C8.272 3 8.417 3.041 8.588 3.123C9.169 3.4 9.32 4.101 9.32 4.665C9.32 4.936 8.906 5.748 8.85 6.029C8.85 6.029 9.717 5.837 10.729 5.83C11.79 5.824 12.478 6.02 12.478 6.672C12.478 6.933 12.259 7.195 12.162 7.338V7.338ZM3.6 7H4.4C4.55913 7 4.71174 7.06321 4.82426 7.17574C4.93679 7.28826 5 7.44087 5 7.6V11.4C5 11.5591 4.93679 11.7117 4.82426 11.8243C4.71174 11.9368 4.55913 12 4.4 12H3.6C3.44087 12 3.28826 11.9368 3.17574 11.8243C3.06321 11.7117 3 11.5591 3 11.4V7.6C3 7.44087 3.06321 7.28826 3.17574 7.17574C3.28826 7.06321 3.44087 7 3.6 7V7Z"
                    />
                    <defs>
                      <linearGradient
                        id="paintLike_linear"
                        x1="8"
                        x2="8"
                        y2="16"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#18AFFF" />
                        <stop offset="1" stopColor="#0062DF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
                <button onClick={() => handleReaction("love")}>
                  <span>{singleBlog && singleBlog.data.reactions.love}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="url(#paintLove_linear)"
                      d="M8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0Z"
                    />
                    <path
                      fill="#fff"
                      d="M10.4732 4C8.27523 4 8.00023 5.824 8.00023 5.824C8.00023 5.824 7.72623 4 5.52823 4C3.41423 4 2.79823 6.222 3.05623 7.41C3.73623 10.55 8.00023 12.75 8.00023 12.75C8.00023 12.75 12.2652 10.55 12.9452 7.41C13.2022 6.222 12.5852 4 10.4732 4Z"
                    />
                    <defs>
                      <linearGradient
                        id="paintLove_linear"
                        x1="8"
                        x2="8"
                        y2="16"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FF6680" />
                        <stop offset="1" stopColor="#E61739" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
                <button onClick={() => handleReaction("laugh")}>
                  <span>{singleBlog && singleBlog.data.reactions.laugh}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="url(#paintHaha0_linear)"
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8"
                    />
                    <path
                      fill="url(#paintHaha1_linear)"
                      d="M3 8.008C3 10.023 4.006 14 8 14C11.993 14 13 10.023 13 8.008C13 7.849 11.39 7 8 7C4.61 7 3 7.849 3 8.008Z"
                    />
                    <path
                      fill="url(#paintHaha2_linear)"
                      d="M4.54102 12.5C5.34502 13.495 6.44802 14 8.01002 14C9.57302 14 10.665 13.495 11.469 12.5C10.918 11.912 9.87002 11 8.01002 11C6.15002 11 5.09302 11.912 4.54102 12.5Z"
                    />
                    <path
                      fill="#2A3755"
                      d="M6.21297 4.14378C6.47597 4.33178 6.71497 4.59878 6.62297 4.93178C6.55197 5.18578 6.42897 5.30078 6.20097 5.30278C5.42097 5.31378 4.49297 5.55778 3.69497 5.91478C3.62997 5.94378 3.49797 6.00278 3.36297 5.99978C3.23897 5.99678 3.11197 5.94178 3.03597 5.76278C2.96897 5.60578 2.96297 5.37478 3.31197 5.16478C3.85697 4.83478 4.56897 4.68478 5.22097 4.56078C4.81154 4.25823 4.37065 4.00074 3.90597 3.79278C3.47897 3.59878 3.52597 3.33578 3.58297 3.19278C3.70997 2.87578 4.19197 2.99678 4.66097 3.21878C5.20802 3.47428 5.72797 3.78417 6.21297 4.14378V4.14378ZM9.78997 4.14378C10.2742 3.78402 10.7935 3.47411 11.34 3.21878C11.81 2.99678 12.29 2.87578 12.418 3.19278C12.475 3.33578 12.522 3.59878 12.095 3.79278C11.6308 4.00053 11.1906 4.25804 10.782 4.56078C11.432 4.68378 12.145 4.83478 12.689 5.16478C13.038 5.37478 13.031 5.60478 12.965 5.76278C12.888 5.94278 12.762 5.99678 12.638 5.99978C12.503 6.00278 12.371 5.94378 12.306 5.91478C11.509 5.55778 10.581 5.31478 9.80197 5.30278C9.57397 5.30078 9.45097 5.18578 9.37997 4.93278C9.28897 4.59978 9.52697 4.33278 9.78997 4.14478V4.14378Z"
                    />
                    <defs>
                      <linearGradient
                        id="paintHaha0_linear"
                        x1="8"
                        x2="8"
                        y1="1.64"
                        y2="16"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FEEA70" />
                        <stop offset="1" stopColor="#F69B30" />
                      </linearGradient>
                      <linearGradient
                        id="paintHaha1_linear"
                        x1="8"
                        x2="8"
                        y1="7"
                        y2="14"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#472315" />
                        <stop offset="1" stopColor="#8B3A0E" />
                      </linearGradient>
                      <linearGradient
                        id="paintHaha2_linear"
                        x1="8.005"
                        x2="8.005"
                        y1="11"
                        y2="13.457"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FC607C" />
                        <stop offset="1" stopColor="#D91F3A" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
                <button onClick={() => handleReaction("sad")}>
                  <span>{singleBlog && singleBlog.data.reactions.sad}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="url(#paintSad0_linear)"
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8"
                    />
                    <path
                      fill="url(#paintSad1_linear)"
                      d="M5.33301 12.765C5.33301 12.902 5.42701 13 5.58301 13C5.93401 13 6.41901 12.375 8.00001 12.375C9.58101 12.375 10.067 13 10.417 13C10.573 13 10.667 12.902 10.667 12.765C10.667 12.368 9.82801 11 8.00001 11C6.17201 11 5.33301 12.368 5.33301 12.765Z"
                    />
                    <path
                      fill="url(#paintSad2_linear)"
                      d="M3.59872 8.79998C3.59872 7.98998 4.10772 7.33398 4.73272 7.33398C5.35972 7.33398 5.86672 7.98998 5.86672 8.79998C5.86672 9.13798 5.77772 9.44998 5.62872 9.69798C5.56211 9.80986 5.45387 9.89077 5.32772 9.92298C5.18772 9.95998 4.97472 9.99998 4.73272 9.99998C4.48972 9.99998 4.27972 9.95998 4.13772 9.92298C4.01184 9.89073 3.90393 9.8098 3.83772 9.69798C3.67817 9.42583 3.59556 9.11544 3.59872 8.79998V8.79998ZM10.1327 8.79998C10.1327 7.98998 10.6407 7.33398 11.2657 7.33398C11.8927 7.33398 12.3997 7.98998 12.3997 8.79998C12.3997 9.13798 12.3107 9.44998 12.1617 9.69798C12.1288 9.75345 12.0853 9.80188 12.0336 9.84049C11.982 9.8791 11.9232 9.90713 11.8607 9.92298C11.4708 10.024 11.0616 10.024 10.6717 9.92298C10.6092 9.90713 10.5504 9.8791 10.4988 9.84049C10.4471 9.80188 10.4036 9.75345 10.3707 9.69798C10.2115 9.42575 10.1292 9.11536 10.1327 8.79998V8.79998Z"
                    />
                    <path
                      fill="#000"
                      d="M3.59872 8.79998C3.59872 7.98998 4.10772 7.33398 4.73272 7.33398C5.35972 7.33398 5.86672 7.98998 5.86672 8.79998C5.86672 9.13798 5.77772 9.44998 5.62872 9.69798C5.56211 9.80986 5.45387 9.89077 5.32772 9.92298C5.18772 9.95998 4.97472 9.99998 4.73272 9.99998C4.48972 9.99998 4.27972 9.95998 4.13772 9.92298C4.01184 9.89073 3.90393 9.8098 3.83772 9.69798C3.67817 9.42583 3.59556 9.11544 3.59872 8.79998V8.79998ZM10.1327 8.79998C10.1327 7.98998 10.6407 7.33398 11.2657 7.33398C11.8927 7.33398 12.3997 7.98998 12.3997 8.79998C12.3997 9.13798 12.3107 9.44998 12.1617 9.69798C12.1288 9.75345 12.0853 9.80188 12.0336 9.84049C11.982 9.8791 11.9232 9.90713 11.8607 9.92298C11.4708 10.024 11.0616 10.024 10.6717 9.92298C10.6092 9.90713 10.5504 9.8791 10.4988 9.84049C10.4471 9.80188 10.4036 9.75345 10.3707 9.69798C10.2115 9.42575 10.1292 9.11536 10.1327 8.79998V8.79998Z"
                      filter="url(#filter0_i)"
                    />
                    <path
                      fill="#4E506A"
                      d="M4.61595 7.98556C4.74395 8.11056 4.75195 8.35756 4.63295 8.53656C4.51295 8.71456 4.31295 8.75856 4.18495 8.63256C4.05695 8.50756 4.04995 8.26056 4.16795 8.08256C4.28795 7.90356 4.48795 7.86056 4.61595 7.98556V7.98556ZM11.105 7.98556C11.233 8.11056 11.241 8.35756 11.123 8.53656C11.003 8.71456 10.803 8.75856 10.673 8.63256C10.546 8.50756 10.539 8.26056 10.658 8.08256C10.777 7.90356 10.977 7.86056 11.105 7.98556V7.98556Z"
                    />
                    <path
                      fill="url(#paintSad3_linear)"
                      d="M4.1572 5.15259C4.4892 4.99959 4.7532 4.93359 4.9582 4.93359C5.2352 4.93359 5.4092 5.05259 5.5082 5.23959C5.6832 5.56859 5.6042 5.64059 5.3102 5.69859C4.2042 5.92259 3.0932 6.64059 2.6112 7.08859C2.3102 7.36859 2.0222 7.05859 2.1752 6.81459C2.3292 6.57059 2.9492 5.70959 4.1572 5.15259V5.15259ZM10.4922 5.23959C10.5912 5.05259 10.7652 4.93359 11.0422 4.93359C11.2482 4.93359 11.5112 4.99959 11.8432 5.15259C13.0512 5.70959 13.6712 6.57059 13.8242 6.81459C13.9772 7.05859 13.6902 7.36859 13.3892 7.08859C12.9062 6.64059 11.7962 5.92259 10.6892 5.69859C10.3952 5.64059 10.3182 5.56859 10.4922 5.23959V5.23959Z"
                    />
                    <path
                      fill="url(#paintSad4_linear)"
                      d="M13.5 16C12.672 16 12 15.252 12 14.329C12 13.407 12.356 12.784 12.643 12.182C13.241 10.924 13.359 10.75 13.5 10.75C13.641 10.75 13.759 10.924 14.357 12.182C14.644 12.784 15 13.407 15 14.329C15 15.252 14.328 16 13.5 16Z"
                    />
                    <path
                      fill="url(#paintSad5_linear)"
                      d="M13.5002 13.6063C13.1722 13.6063 12.9062 13.3103 12.9062 12.9463C12.9062 12.5803 13.0473 12.3333 13.1613 12.0943C13.3973 11.5963 13.4442 11.5283 13.5002 11.5283C13.5562 11.5283 13.6032 11.5963 13.8392 12.0943C13.9532 12.3343 14.0942 12.5803 14.0942 12.9453C14.0942 13.3103 13.8282 13.6063 13.5002 13.6063"
                    />
                    <defs>
                      <linearGradient
                        id="paintSad0_linear"
                        x1="8"
                        x2="8"
                        y1="1.64"
                        y2="16"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FEEA70" />
                        <stop offset="1" stopColor="#F69B30" />
                      </linearGradient>
                      <linearGradient
                        id="paintSad1_linear"
                        x1="8"
                        x2="8"
                        y1="11"
                        y2="13"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#472315" />
                        <stop offset="1" stopColor="#8B3A0E" />
                      </linearGradient>
                      <linearGradient
                        id="paintSad2_linear"
                        x1="7.999"
                        x2="7.999"
                        y1="7.334"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#191A33" />
                        <stop offset=".872" stopColor="#3B426A" />
                      </linearGradient>
                      <linearGradient
                        id="paintSad3_linear"
                        x1="8"
                        x2="8"
                        y1="4.934"
                        y2="7.199"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E78E0D" />
                        <stop offset="1" stopColor="#CB6000" />
                      </linearGradient>
                      <linearGradient
                        id="paintSad4_linear"
                        x1="13.5"
                        x2="13.5"
                        y1="15.05"
                        y2="11.692"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#35CAFC" />
                        <stop offset="1" stopColor="#007EDB" />
                      </linearGradient>
                      <linearGradient
                        id="paintSad5_linear"
                        x1="13.5"
                        x2="13.5"
                        y1="11.528"
                        y2="13.606"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6AE1FF" stopOpacity=".287" />
                        <stop
                          offset="1"
                          stopColor="#A8E3FF"
                          stopOpacity=".799"
                        />
                      </linearGradient>
                      <filter
                        id="filter0_i"
                        width="8.801"
                        height="2.666"
                        x="3.599"
                        y="7.334"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          result="hardAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation=".5" />
                        <feComposite
                          in2="hardAlpha"
                          k2="-1"
                          k3="1"
                          operator="arithmetic"
                        />
                        <feColorMatrix values="0 0 0 0 0.0411227 0 0 0 0 0.0430885 0 0 0 0 0.0922353 0 0 0 0.819684 0" />
                        <feBlend in2="shape" result="effect1_innerShadow" />
                      </filter>
                    </defs>
                  </svg>
                </button>
                <button onClick={() => handleReaction("angry")}>
                  <span>{singleBlog && singleBlog.data.reactions.angry}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="url(#paintAngry0_linear)"
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8"
                    />
                    <path
                      fill="#000"
                      d="M5.2002 13.551C5.2002 14.079 6.4532 13.995 8.0002 13.995C9.5462 13.995 10.8002 14.079 10.8002 13.551C10.8002 12.915 9.5462 12.5 8.0002 12.5C6.4532 12.5 5.2002 12.915 5.2002 13.551Z"
                      filter="url(#filter0_d)"
                    />
                    <path
                      fill="url(#paintAngry1_linear)"
                      d="M5.2002 13.551C5.2002 14.079 6.4532 13.995 8.0002 13.995C9.5462 13.995 10.8002 14.079 10.8002 13.551C10.8002 12.915 9.5462 12.5 8.0002 12.5C6.4532 12.5 5.2002 12.915 5.2002 13.551Z"
                    />
                    <path
                      fill="url(#paintAngry2_linear)"
                      d="M3.59968 9.83139C3.59968 9.04039 4.13769 8.40039 4.79969 8.40039C5.46269 8.40039 5.99969 9.04039 5.99969 9.83139C5.99969 10.1604 5.90669 10.4644 5.74769 10.7054C5.67339 10.8164 5.55973 10.895 5.42968 10.9254C5.27968 10.9614 5.05669 11.0004 4.79969 11.0004C4.54269 11.0004 4.31869 10.9614 4.16969 10.9254C4.03951 10.8953 3.92576 10.8166 3.85168 10.7054C3.68426 10.4449 3.59667 10.1411 3.59968 9.83139V9.83139ZM9.99968 9.83139C9.99968 9.04039 10.5367 8.40039 11.1997 8.40039C11.8617 8.40039 12.3997 9.04039 12.3997 9.83139C12.3997 10.1604 12.3057 10.4644 12.1477 10.7054C12.0736 10.8166 11.9599 10.8953 11.8297 10.9254C11.6233 10.9748 11.4119 10.9999 11.1997 11.0004C10.9427 11.0004 10.7197 10.9614 10.5697 10.9254C10.4394 10.895 10.3254 10.8164 10.2507 10.7054C10.084 10.4446 9.99683 10.1409 9.99968 9.83139Z"
                    />
                    <path
                      fill="#000"
                      d="M3.59968 9.83139C3.59968 9.04039 4.13769 8.40039 4.79969 8.40039C5.46269 8.40039 5.99969 9.04039 5.99969 9.83139C5.99969 10.1604 5.90669 10.4644 5.74769 10.7054C5.67339 10.8164 5.55973 10.895 5.42968 10.9254C5.27968 10.9614 5.05669 11.0004 4.79969 11.0004C4.54269 11.0004 4.31869 10.9614 4.16969 10.9254C4.03951 10.8953 3.92576 10.8166 3.85168 10.7054C3.68426 10.4449 3.59667 10.1411 3.59968 9.83139V9.83139ZM9.99968 9.83139C9.99968 9.04039 10.5367 8.40039 11.1997 8.40039C11.8617 8.40039 12.3997 9.04039 12.3997 9.83139C12.3997 10.1604 12.3057 10.4644 12.1477 10.7054C12.0736 10.8166 11.9599 10.8953 11.8297 10.9254C11.6233 10.9748 11.4119 10.9999 11.1997 11.0004C10.9427 11.0004 10.7197 10.9614 10.5697 10.9254C10.4394 10.895 10.3254 10.8164 10.2507 10.7054C10.084 10.4446 9.99683 10.1409 9.99968 9.83139Z"
                      filter="url(#filter1_i)"
                    />
                    <path
                      fill="#4F4F67"
                      d="M4.96848 9.33262C4.97338 9.35596 4.97572 9.37977 4.97548 9.40362C4.97548 9.60462 4.79948 9.76962 4.58148 9.76962C4.36448 9.76962 4.18848 9.60462 4.18848 9.40362C4.18848 9.32062 4.21848 9.24362 4.26848 9.18262C4.49248 9.23562 4.72748 9.28662 4.96848 9.33262ZM10.8945 9.76962C10.6835 9.76962 10.5115 9.61662 10.5015 9.42162C10.7605 9.38362 11.0175 9.33662 11.2675 9.28562C11.2813 9.32374 11.2881 9.36406 11.2875 9.40462C11.2875 9.60462 11.1125 9.76962 10.8945 9.76962V9.76962Z"
                    />
                    <path
                      fill="#000"
                      d="M8.99959 7.6C8.99959 7.154 9.16259 7 9.44459 7C9.72459 7 9.85859 7.276 9.95059 8.066C11.0786 8.066 12.9886 7.532 13.1726 7.532C13.3506 7.532 13.4496 7.617 13.4896 7.799C13.5246 7.957 13.4666 8.107 13.2686 8.199C12.6476 8.486 10.8256 9.134 9.28459 9.134C9.11659 9.134 8.99959 9.048 8.99959 8.833V7.6ZM6.04859 8.066C6.14059 7.276 6.27459 7 6.55459 7C6.83659 7 6.99959 7.154 6.99959 7.6V8.833C6.99959 9.048 6.88259 9.134 6.71459 9.134C5.17359 9.134 3.35159 8.486 2.73059 8.199C2.53259 8.107 2.47459 7.957 2.50959 7.799C2.55059 7.617 2.64959 7.532 2.82659 7.532C3.01059 7.532 4.92059 8.066 6.04859 8.066Z"
                      filter="url(#filter2_d)"
                    />
                    <path
                      fill="url(#paintAngry3_linear)"
                      d="M8.99959 7.6C8.99959 7.154 9.16259 7 9.44459 7C9.72459 7 9.85859 7.276 9.95059 8.066C11.0786 8.066 12.9886 7.532 13.1726 7.532C13.3506 7.532 13.4496 7.617 13.4896 7.799C13.5246 7.957 13.4666 8.107 13.2686 8.199C12.6476 8.486 10.8256 9.134 9.28459 9.134C9.11659 9.134 8.99959 9.048 8.99959 8.833V7.6ZM6.04859 8.066C6.14059 7.276 6.27459 7 6.55459 7C6.83659 7 6.99959 7.154 6.99959 7.6V8.833C6.99959 9.048 6.88259 9.134 6.71459 9.134C5.17359 9.134 3.35159 8.486 2.73059 8.199C2.53259 8.107 2.47459 7.957 2.50959 7.799C2.55059 7.617 2.64959 7.532 2.82659 7.532C3.01059 7.532 4.92059 8.066 6.04859 8.066Z"
                    />
                    <defs>
                      <linearGradient
                        id="paintAngry0_linear"
                        x1="8"
                        x2="8"
                        y2="10.751"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E04300" />
                        <stop offset="1" stopColor="#FFA320" />
                      </linearGradient>
                      <linearGradient
                        id="paintAngry1_linear"
                        x1="8"
                        x2="8"
                        y1="12.703"
                        y2="14"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#3D0D00" />
                        <stop offset="1" stopColor="#661C04" />
                      </linearGradient>
                      <linearGradient
                        id="paintAngry2_linear"
                        x1="8"
                        x2="8"
                        y1="8.4"
                        y2="11"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#191A33" />
                        <stop offset=".872" stopColor="#3B426A" />
                      </linearGradient>
                      <linearGradient
                        id="paintAngry3_linear"
                        x1="11.615"
                        x2="11.615"
                        y1="9.333"
                        y2="7"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#9A2F00" />
                        <stop offset="1" stopColor="#D44800" />
                      </linearGradient>
                      <filter
                        id="filter0_d"
                        width="7.6"
                        height="3.5"
                        x="4.2"
                        y="12.5"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation=".5" />
                        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.509681 0 0 0 0 0 0 0 0 0.371207 0" />
                        <feBlend
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="effect1_dropShadow"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_i"
                        width="8.8"
                        height="2.6"
                        x="3.6"
                        y="8.4"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          result="hardAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation=".5" />
                        <feComposite
                          in2="hardAlpha"
                          k2="-1"
                          k3="1"
                          operator="arithmetic"
                        />
                        <feColorMatrix values="0 0 0 0 0.0387428 0 0 0 0 0.0406183 0 0 0 0 0.0875053 0 0 0 1 0" />
                        <feBlend in2="shape" result="effect1_innerShadow" />
                      </filter>
                      <filter
                        id="filter2_d"
                        width="11.199"
                        height="2.834"
                        x="2.4"
                        y="7"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy=".6" />
                        <feGaussianBlur stdDeviation=".05" />
                        <feColorMatrix values="0 0 0 0 0.565875 0 0 0 0 0.151272 0 0 0 0 0 0 0 0 0.15024 0" />
                        <feBlend
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="effect1_dropShadow"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
            <p className="num">
              {singleBlog && singleBlog.data.reviewCount} Comments
            </p>
            <p className="time">
              <Moment fromNow>
                {singleBlog && singleBlog.data.author.createdAt}
              </Moment>
            </p>
          </div>
          <div className="comments">
            {checkLogin ? (
              <form onSubmit={handleSubmit}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="smile"
                  className="svg-inline--fa fa-smile fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
                  ></path>
                </svg>
                <input
                  type="text"
                  name="content"
                  placeholder="Add a comment…"
                  onChange={handleChange}
                />
                <button type="submit">Post</button>
              </form>
            ) : (
              <Link to="/login" className="comments__no-comment not-hover">
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
                <p>Please login to write comment!</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
