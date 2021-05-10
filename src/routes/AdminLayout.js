import React from "react";
import { Route, Switch } from "react-router";
import ProfilePage from "../pages/ProfilePage";
import BlogsPage from "../pages/BlogsPage";
import FriendsPage from "../pages/FriendsPage";

const AdminLayout = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin/profile" component={ProfilePage} />
        <Route exact path="/admin/blogs" component={BlogsPage} />
        <Route exact path="/admin/friends" component={FriendsPage} />
      </Switch>
    </div>
  );
};

export default AdminLayout;
