import React, { useRef, useState } from "react";

const AddPost = ({ handleRefreshPosts, user_id }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addPost = async (e) => {
    e.preventDefault();
    if (titleInputRef.current.value === "" || bodyInputRef.current.value === "")
      return;

    try {
      let title = formData.title;
      let body = formData.body;

      const response = await fetch(
        `https://gorest.co.in/public/v2/users/${user_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
          },
          body: JSON.stringify({
            user: "0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
            user_id,
            title,
            body,
          }),
        }
      );

      const addedPost = await response.json();
      addedPost.id && handleRefreshPosts(addedPost);
      titleInputRef.current.value = "";
      bodyInputRef.current.value = "";
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  return (
    <>
      <form onSubmit={addPost}>
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
              onClick={addPost}
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
