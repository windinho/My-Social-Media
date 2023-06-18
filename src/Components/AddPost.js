import React, { useRef, useState } from "react";

const AddPost = ({ handleRefreshPosts, user_id }) => {
  const [formData, setFormData] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addPost = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;

    try {
      let title = formData.title;
      let body = formData.title;

      const response = await fetch(
        `https://gorest.co.in/public/v2/users/${user_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5"
          },
          body: JSON.stringify({
            user:
              "0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
            user_id,
            title,
            body
          })
        }
      );

      const addedPost = await response.json();
      addedPost.id && handleRefreshPosts(addedPost);
      inputRef.current.value = "";
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  return (
    <>
      <form className="input-group" onSubmit={addPost}>
        <input
          ref={inputRef}
          type="text"
          className="form-control border-0 gray-bg"
          name="title"
          placeholder="Write a post..."
          onChange={handleChange}
        />
        {inputRef?.current?.value && (
          <button className="btn btn-dark" type="button" onClick={addPost}>
            Post
          </button>
        )}
      </form>
    </>
  );
};

export default AddPost;
