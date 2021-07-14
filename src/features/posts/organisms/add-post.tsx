import React from "react";
import { Post } from "features/posts/molecules";

export const AddPost = () => {
  const data = {
    posts: [
      { id: 1, title: "Post 1", body: "some comment" },
      { id: 2, title: "Post 2", body: "some comment" },
      { id: 3, title: "Post 3", body: "some comment" },
    ],
    comments: [
      { id: 1, body: "some comment", postId: 1 },
      { id: 2, body: "some comment", postId: 1 },
    ],
    profile: {
      name: "typicode",
    },
  };
  return (
    <>
      {data.posts.map((el) => (
        <Post
          key={el.id}
          id={el.id}
          title={el.title}
          body={el.body}
          isEdited={false}
        />
      ))}
    </>
  );
};
