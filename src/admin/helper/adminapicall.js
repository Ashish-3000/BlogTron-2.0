import { isAuthenticated } from "../../auth";
import { API } from "../../backend";

export const addTag = (tag) => {
  const { user, token } = isAuthenticated();
  return fetch(`${API}/createtag/${user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeThisTag = (tag) => {
  const { user, token } = isAuthenticated();
  return fetch(`${API}/removetag/${user._id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((resposne) => {
      return resposne.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
