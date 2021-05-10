const initialState = {
  blogs: [],
  loading: false,
  currentPage: 1,
  error: "",
  singleBlog: [],
  comment: [],
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "BLOG_REQUEST_START":
    case "SEARCHBLOG_REQUEST_START":
    case "FILTERBLOG_REQUEST_START":
    case "SINGLEBLOG_REQUEST_START":
    case "REVIEWS_REQUEST_START":
    case "WRITEREVIEW_REQUEST_START":
    case "CREATEBLOG_REQUEST_START":
    case "DELETEBLOG_REQUEST_START":
    case "EDITBLOG_REQUEST_START":
    case "REACTION_REQUEST_START":
      state.loading = true;
      break;
    case "BLOG_REQUEST_FAIL":
    case "SEARCHBLOG_REQUEST_FAIL":
    case "FILTERBLOG_REQUEST_FAIL":
    case "SINGLEBLOG_REQUEST_FAIL":
    case "REVIEWS_REQUEST_FAIL":
    case "WRITEREVIEW_REQUEST_FAIL":
    case "CREATEBLOG_REQUEST_FAIL":
    case "DELETEBLOG_REQUEST_FAIL":
    case "EDITBLOG_REQUEST_FAIL":
    case "REACTION_REQUEST_FAIL":
      state.error = payload;
      state.loading = false;
      break;
    case "BLOG_REQUEST_SUCCESS":
      state.blogs = payload.data;
      state.currentPage = payload.currentPage;
      state.loading = false;
      break;
    case "SEARCHBLOG_REQUEST_SUCCESS":
      state.blogs = payload.data;
      state.currentPage = payload.currentPage;
      state.loading = false;
      break;
    case "FILTERBLOG_REQUEST_SUCCESS":
      state.blogs = payload.data;
      state.currentPage = payload.currentPage;
      state.loading = false;
      break;
    case "SINGLEBLOG_REQUEST_SUCCESS":
      state.singleBlog = payload;
      state.loading = false;
      break;
    case "REVIEWS_REQUEST_SUCCESS":
      state.comment = payload;
      state.loading = false;
      break;
    case "WRITEREVIEW_REQUEST_SUCCESS":
      state.loading = false;
      break;
    case "CREATEBLOG_REQUEST_SUCCESS":
      state.loading = false;
      break;
    case "DELETEBLOG_REQUEST_SUCCESS":
      state.loading = false;
      break;
    case "EDITBLOG_REQUEST_SUCCESS":
      state.loading = false;
      break;
    case "REACTION_REQUEST_SUCCESS":
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default blogReducer;
