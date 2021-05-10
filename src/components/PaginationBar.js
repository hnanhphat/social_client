import React from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BlogActions } from "../redux/actions/blog.action";
import { userActions } from "../redux/actions/user.action";

const PaginationBar = ({ currentPage, totalPage, user }) => {
  let dispatch = useDispatch();

  const handleClick = (page) => {
    user
      ? dispatch(userActions.getAllUser(parseInt(page)))
      : dispatch(BlogActions.getBlog(parseInt(page)));
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickOnNext = () => {
    if (currentPage < totalPage) {
      user
        ? dispatch(userActions.getAllUser(currentPage + 1))
        : dispatch(BlogActions.getBlog(currentPage + 1));
    }
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickOnPrev = () => {
    if (currentPage > 1) {
      user
        ? dispatch(userActions.getAllUser(currentPage - 1))
        : dispatch(BlogActions.getBlog(currentPage - 1));
    }
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={handleClickOnPrev}
      />
      <Pagination.Item
        active={currentPage === 1}
        onClick={() => handleClick(1)}
      >
        {1}
      </Pagination.Item>

      {currentPage - 2 > 1 && <Pagination.Ellipsis />}

      {currentPage - 1 > 1 && (
        <Pagination.Item
          active={currentPage === currentPage - 1}
          onClick={() => handleClick(currentPage - 1)}
        >
          {currentPage - 1}
        </Pagination.Item>
      )}
      {currentPage > 1 && currentPage < totalPage && (
        <Pagination.Item active>{currentPage}</Pagination.Item>
      )}
      {currentPage + 1 < totalPage && (
        <Pagination.Item
          active={currentPage === currentPage + 1}
          onClick={() => handleClick(currentPage + 1)}
        >
          {currentPage + 1}
        </Pagination.Item>
      )}

      {totalPage > currentPage + 2 && <Pagination.Ellipsis />}

      {totalPage > 1 && (
        <Pagination.Item
          active={currentPage === totalPage}
          onClick={() => handleClick(totalPage)}
        >
          {totalPage}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={currentPage === totalPage}
        onClick={handleClickOnNext}
      />
    </Pagination>
  );
};

export default PaginationBar;
