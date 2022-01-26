import { API } from "../../backend";

export const getAllTags = () => {
  return fetch(`${API}/alltags`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTaggedBlogs = (name) => {
  return fetch(`${API}/tag/${name}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
