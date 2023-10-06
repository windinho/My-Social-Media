import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://gorest.co.in/public/v2" }),
  tagTypes: ["Users", "Posts", "Comments"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `users?page=1&per_page=10`,
        headers,
      }),
      providesTags: ["Users"],
    }),
    getPosts: builder.query({
      query: (id) => ({
        url: `users/${id}/posts`,
        headers,
      }),
      providesTags: ["Posts"],
    }),
    getComments: builder.query({
      query: (post_id) => ({
        url: `posts/${post_id}/comments`,
        headers,
      }),
      providesTags: ["Comments"],
    }),
    addUser: builder.mutation({
      query(data) {
        const { name, email, gender, status } = data.formData;
        return {
          url: `users`,
          method: "POST",
          headers,
          body: JSON.stringify({ name, email, gender, status }),
        };
      },
      invalidatesTags: ["Users"],
    }),
    addPost: builder.mutation({
      query(data) {
        const { userId, title, body } = data;
        return {
          url: `users/${userId}/posts`,
          method: "POST",
          headers,
          body: JSON.stringify({
            user: "0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
            userId,
            title,
            body,
          }),
        };
      },
      invalidatesTags: ["Posts"],
    }),
    addComment: builder.mutation({
      query(data) {
        const { post_id, name, email, body } = data;
        return {
          url: `posts/${post_id}/comments`,
          method: "POST",
          headers,
          body: JSON.stringify({ post_id, name, email, body }),
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetCommentsQuery,
  useAddUserMutation,
  useAddPostMutation,
  useAddCommentMutation,
} = api;
