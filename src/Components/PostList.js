import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPost from "./AddPost";
import CommentsList from "./CommentsList";

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
              "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5"
          }
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
    <div className="container col-lg-4 py-4">
      <div className="card mb-3">
        <div className="card-body">
          <AddPost handleRefreshPosts={handleRefreshPosts} user_id={id} />
        </div>
      </div>

      {posts.length ? (
        posts.map((post) => (
          <div className="card mb-3" key={post.id}>
            <div className="card-body">
              <h6>{post.title}</h6>
              <p className="small">{post.body}</p>
            </div>

            <div className="card-footer bg-white">
              <CommentsList post_id={post.id} />
            </div>
          </div>
        ))
      ) : (
        <div className="card mb-3">
          <div className="card-body">
            {isPostLoading ? (
              <p className="placeholder-wave">
                <span className="placeholder col-4"></span>
              </p>
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
