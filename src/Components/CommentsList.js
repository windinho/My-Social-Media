import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { ReactComponent as UserIcon } from "../Assets/user.svg";
import { useGetCommentsQuery } from "../redux/api";

const CommentsList = ({ post_id }) => {
  const { data: comments, error, isLoading } = useGetCommentsQuery(post_id);

  return (
    <>
      <AddComment post_id={post_id} comments={comments} />

      {comments?.map((comment) => (
        <div className="d-flex align-items-start mt-2" key={comment.id}>
          <UserIcon width="24" className="me-2 flex-shrink-0" />
          <div className="card border-0 gray-bg">
            <div className="card-body p-2 small">{comment.body}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
