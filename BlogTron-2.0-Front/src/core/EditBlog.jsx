import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Editor from "./Editor";
import { updateBlog } from "./helper/blogapicalls";
import Menu from "./Menu";
import Upload from "./Upload";
import Multiselect from "multiselect-react-dropdown";
import { getAllTags } from "./helper/tagapicalls";

function Blog() {
  const { blogdata } = useLocation().state;
  const navigate = useNavigate();

  const { user, token } = isAuthenticated();
  const [editorData, setEditorData] = useState(blogdata.content[0]);
  const [flag, setFlag] = useState(0);
  const [url, setUrl] = useState(blogdata.photo);
  const [title, setTitle] = useState(blogdata.title);
  // const preValues = blogdata.tags.length != 0 ? blogdata.tags : [];
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getAllTags().then((data) => {
      setTags(data);
    });
  }, []);

  const types = ["image/png", "image/jpeg", "image/jpg"];
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const onSubmit = (key) => {
    const content = editorData;
    let tagList = [];
    selectedTags.map((tag) => {
      tagList.push(tag.name);
    });
    const blog = {
      title: title,
      photo: url,
      content: content,
      saved: key === "saved" ? 1 : 0,
      published: key === "published" ? 1 : 0,
      tags: tagList,
    };
    const id = blogdata._id;
    updateBlog({ blog, id })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          navigate(`/author/${user.penname}`);
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedTags(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    // selectedList = selectedList.filter(removedItem);
  };

  return (
    <div>
      <Menu main={false} />
      <div className="w-10/12 m-auto lg:w-1/2">
        <input
          type="text"
          className="border-0 border-none focus:border-0 focus:border-none mt-2 text-2xl p-2 w-full"
          placeholder="My Special Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={changeHandler}
        />
        {url === "" && (
          <label
            type="button"
            className="mt-3 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
            for="file"
          >
            Add Image
          </label>
        )}
        {error && <div>{error}</div>}
        {file && <Upload setUrl={setUrl} file={file} />}
        {url && (
          <div className="m-3 flex flex-items-center items-center">
            <img src={url} className="w-1/2 h-1/2" />
            <label
              type="button"
              className="ml-3 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
              onClick={() => {
                setUrl("");
              }}
            >
              Remove
            </label>
          </div>
        )}
        <div>
          <Multiselect
            options={tags}
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            showArrow="true"
            selectionLimit="4"
          />
        </div>
        <div className="mt-3 mb-3 pl-9 h-1/2 border-2 border-orange-400 overflow-y-scroll">
          <Editor
            editorData={editorData}
            setEditorData={setEditorData}
            flag={flag}
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            setFlag(1);
            onSubmit("saved");
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="py-2 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => {
            setFlag(1);
            onSubmit("published");
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default Blog;
