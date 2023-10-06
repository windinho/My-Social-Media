import React, { useRef, useState } from "react";
import { useAddPostMutation } from "../redux/api";

const AddPost = ({ userId }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  const [addPost, result] = useAddPostMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (titleInputRef.current.value === "" || bodyInputRef.current.value === "")
      return;

    let title = formData.title;
    let body = formData.body;
    addPost({userId, title, body});
    
    titleInputRef.current.value = "";
    bodyInputRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleAddPost}>
        <div className="mb-1">
          <label for="title" className="form-label">
            Write a Post
          </label>
          <input
            ref={titleInputRef}
            type="text"
            className="form-control border-0 gray-bg"
            name="title"
            id="title"
            placeholder="Enter Title"
            onChange={handleChange}
          />
        </div>
        <textarea
          ref={bodyInputRef}
          type="text"
          className="form-control border-0 gray-bg"
          name="body"
          id="body"
          placeholder="Enter Description"
          onChange={handleChange}
        />
        {titleInputRef?.current?.value && bodyInputRef?.current?.value && (
          <div className="text-end">
            <button
              className="btn btn-dark mt-2 w-10"
              type="button"
              onClick={handleAddPost}
            >
              Post
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default AddPost;
