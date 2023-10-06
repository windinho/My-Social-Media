import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPost from "./AddPost";
import CommentsList from "./CommentsList";
import { ReactComponent as NotesIcon } from "../Assets/notes-icon.svg";
import { useGetPostsQuery } from "../redux/api";

const PostList = () => {
  let { id } = useParams();
  const { data: posts, error, isLoading } = useGetPostsQuery(id);

  return (
    <div className="container col-lg-5">
      <div className="card mb-3">
        <div className="card-body">
          <AddPost userId={id} />
        </div>
      </div>

      {posts?.length
        ? posts.map((post) => (
            <div className="card mb-3 post" key={post.id}>
              <div className="card-body d-flex align-items-start">
                <NotesIcon
                  width="20"
                  className="me-2 notes-icon flex-shrink-0"
                />
                <div>
                  <h6>{post.title}</h6>
                  <p className="small">{post.body}</p>
                </div>
              </div>

              <div className="card-footer bg-white">
                <CommentsList post_id={post.id} />
              </div>
            </div>
          ))
        : isLoading && (
            <div className="card mb-3">
              <div className="card-body">
                <p className="placeholder-wave">
                  <span className="placeholder col-4"></span>
                </p>
              </div>
            </div>
          )}
    </div>
  );
};

export default PostList;
