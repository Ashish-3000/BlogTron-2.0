import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Tags from "./core/Tags";
import Reviews from "./core/Reviews";
import Gaming from "./core/Gaming";
import About from "./core/About";
import Dashboard from "./user/Dashboard";
import Profile from "./user/Profile";
import EditTag from "./admin/EditTag";
import Blog from "./core/Blog";
import AdminRoute from "./auth/AdminRoutes";
import PrivateRoute from "./auth/PrivateRoutes";
import EditBlog from "./core/EditBlog";
import TaggedBlogs from "./core/TaggedBlogs";
import BlogTemplate from "./core/BlogTemplate";

function MyRoutes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/tags" exact element={<Tags />} />
          <Route path="/reviews" exact element={<Reviews />} />
          <Route path="/gaming" exact element={<Gaming />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/author/:name" exact element={<Dashboard />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route
            path="/edittag"
            exact
            element={
              <AdminRoute>
                <EditTag />
              </AdminRoute>
            }
          />
          <Route path="/tag/:name" exact element={<TaggedBlogs />} />
          <Route path="/blog/:name" exact element={<BlogTemplate />} />
          <Route
            path="/createblog"
            exact
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
          <Route
            path="/editblog/:name"
            exact
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default MyRoutes;
