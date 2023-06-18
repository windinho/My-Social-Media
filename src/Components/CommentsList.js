import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { ReactComponent as UserIcon } from "../Assets/user.svg";

const CommentsList = ({ post_id }) => {
  const [comments, setComments] = useState([]);

  const handleRefreshComments = (newComment) => {
    setComments((oldComments) => [newComment, ...oldComments]);
  };

  const fetchComments = async () => {
    try {
      // getting comments
      const commentsResponse = await fetch(
        `https://gorest.co.in/public/v2/posts/${post_id}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5"
          }
        }
      );
      const commentsData = await commentsResponse.json();
      setComments(commentsData);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <AddComment
        post_id={post_id}
        comments={comments}
        handleRefreshComments={handleRefreshComments}
      />

      {comments.map((comment) => (
        <div className="d-flex align-items-center mt-2" key={comment.id}>
          <UserIcon width="24" className="me-2" />
          <div className="card border-0 gray-bg">
            <div className="card-body p-2 small">{comment.body}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
