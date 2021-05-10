import React from "react";
import { Route, Switch } from "react-router";

// PAGES
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import AccountPage from "../pages/AccountPage";
import AddBlogPage from "../pages/AddBlogPage";
import EditBlogPage from "../pages/EditBlogPage";
import NotFoundPage from "../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <div id="home">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={AccountPage} />
        <Route exact path="/add" component={AddBlogPage} />
        <Route exact path="/edit/:id" component={EditBlogPage} />
        <Route exact path="/:id" component={DetailPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default PublicLayout;
