import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPost from "./AddPost";
import CommentsList from "./CommentsList";
import { ReactComponent as NotesIcon } from "../Assets/notes-icon.svg";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(true);
  let { id } = useParams();

  const handleRefreshPosts = (newPost) => {
    setPosts((oldPosts) => [newPost, ...oldPosts]);
  };

  const fetchPosts = async () => {
    try {
      // getting posts
      const postsResponse = await fetch(
        `https://gorest.co.in/public/v2/users/${id}/posts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
          },
        }
      );
      const postsData = await postsResponse.json();
      setPosts(postsData);
      setIsPostLoading(false);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container col-lg-5">
      <div className="card mb-3">
        <div className="card-body">
          <AddPost handleRefreshPosts={handleRefreshPosts} user_id={id} />
        </div>
      </div>

      {posts.length
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
        : isPostLoading && (
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
