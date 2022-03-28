import { isAuthenticated } from "../../auth";
import { API } from "../../backend";

export const createBlog = (blog) => {
  const { user, token } = isAuthenticated();
  return fetch(`${API}/createblog/${user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateBlog = ({ blog, id }) => {
  const { user, token } = isAuthenticated();
  //   console.log(id);
  return fetch(`${API}/updateblog/${id}/${user._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteBlog = (id) => {
  const { user, token } = isAuthenticated();
  return fetch(`${API}/removeblog/${id}/${user._id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllBlogs = () => {
  return fetch(`${API}/allblogs`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
