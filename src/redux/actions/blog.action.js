import api from "../../apiService";
import { routeActions } from "./route.action";

const getBlog = (currentPage) => async (dispatch) => {
  try {
    dispatch({ type: "BLOG_REQUEST_START" });
    const data = await api.get(`/blogs?page=${currentPage}&limit=10`);
    dispatch({
      type: "BLOG_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage },
    });
  } catch (error) {
    dispatch({ type: "BLOG_REQUEST_FAIL", payload: error.message });
  }
};

const searchBlog = (currentPage, keyword) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCHBLOG_REQUEST_START" });
    const data = await api.get(
      `/blogs?page=${currentPage}&limit=10&title[$regex]=${keyword}&title[$options]=i`
    );
    dispatch({
      type: "SEARCHBLOG_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage },
    });
  } catch (error) {
    dispatch({ type: "SEARCHBLOG_REQUEST_FAIL", payload: error.message });
  }
};

const filterBlog = (currentPage, keyword) => async (dispatch) => {
  try {
    dispatch({ type: "FILTERBLOG_REQUEST_START" });
    const data = await api.get(
      `/blogs?page=${currentPage}&limit=10&author=${keyword}`
    );
    dispatch({
      type: "FILTERBLOG_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage },
    });
  } catch (error) {
    dispatch({ type: "FILTERBLOG_REQUEST_FAIL", payload: error.message });
  }
};

const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLEBLOG_REQUEST_START" });
    const res = await api.get(`/blogs/${id}`);
    dispatch({ type: "SINGLEBLOG_REQUEST_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "SINGLEBLOG_REQUEST_FAIL", payload: error.message });
  }
};

const getReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "REVIEWS_REQUEST_START", payload: null });
    const reslist = await api.get(`/reviews/blogs/${id}`);
    dispatch({ type: "REVIEWS_REQUEST_SUCCESS", payload: reslist });
  } catch (error) {
    dispatch({ type: "REVIEWS_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const postReview = ({ content }, id) => async (dispatch) => {
  try {
    dispatch({ type: "WRITEREVIEW_REQUEST_START", payload: null });
    const res = await api.post(`/reviews/blogs/${id}`, content);
    console.log(res);
    dispatch({ type: "WRITEREVIEW_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "WRITEREVIEW_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const createBlog = (data) => async (dispatch) => {
  try {
    dispatch({ type: "CREATEBLOG_REQUEST_START", payload: null });
    const res = await api.post(`/blogs`, data);
    console.log(res);
    dispatch(routeActions.redirect("/"));
    dispatch({ type: "CREATEBLOG_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "CREATEBLOG_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETEBLOG_REQUEST_START", payload: null });
    const res = await api.delete(`/blogs/${id}`);
    dispatch({ type: "DELETEBLOG_REQUEST_SUCCESS", payload: res });
    dispatch(routeActions.redirect("/"));
  } catch (error) {
    dispatch({ type: "DELETEBLOG_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const editBlog = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: "EDITBLOG_REQUEST_START", payload: null });
    const res = await api.put(`/blogs/${id}`, data);
    console.log(res);
    dispatch(routeActions.redirect("/"));
    dispatch({ type: "EDITBLOG_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "EDITBLOG_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const postReaction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "REACTION_REQUEST_START", payload: null });
    const res = await api.post(`/reactions`, data);
    console.log(res);
    dispatch({ type: "REACTION_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "REACTION_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

export const BlogActions = {
  getBlog,
  searchBlog,
  filterBlog,
  getSingleBlog,
  getReviews,
  postReview,
  createBlog,
  deleteBlog,
  editBlog,
  postReaction,
};
