import { isAuthenticated } from "../../auth";
import { API } from "../../backend";

export const getAuthorBlog = (name) => {
  return fetch(`${API}/getauthorblogs/${name}`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export const updateLinks = (links) => {
  const { user, token } = isAuthenticated();
  return fetch(`${API}/links/${user._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(links),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePic = (pic) => {
  const { user, token } = isAuthenticated();
  pic = { photo: pic };
  return fetch(`${API}/updatepic/${user._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pic),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
