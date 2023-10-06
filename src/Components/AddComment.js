import React, { useRef, useState } from "react";
import { useAddCommentMutation } from "../redux/api";

const AddComment = ({ post_id }) => {
  const [comment, setComment] = useState(null);
  const inputRef = useRef(null);
  const [addComment, result] = useAddCommentMutation();

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;
    addComment({
      post_id,
      name: "user",
      email: "user@gmail.com",
      body: comment,
    });

    try {
      /* const response = await fetch(
        `https://gorest.co.in/public/v2/posts/${post_id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
          },
          body: JSON.stringify({
            post_id,
            name: "user",
            email: "user@gmail.com",
            body: comment,
          }),
        },
      ); */

      inputRef.current.value = "";
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  return (
    <form className="input-group" onSubmit={handleAddComment}>
      <input
        ref={inputRef}
        type="text"
        className="form-control border-0 gray-bg"
        name="comment"
        placeholder="Type your comment"
        onChange={handleChange}
      />

      {inputRef?.current?.value && (
        <button
          className="btn btn-dark"
          type="button"
          onClick={handleAddComment}
        >
          Comment
        </button>
      )}
    </form>
  );
};

export default AddComment;
