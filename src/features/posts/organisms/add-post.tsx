import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Post } from "./post";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/model";
import {
  createPost,
  getPosts,
  asyncUploadPost,
  Posts,
  postsSelector,
} from "../model/posts-slice";

const FormWrap = styled.form`
  display: flex;
  justify-content: space-between;
`;

type FormData = {
  title: string;
  body: string;
};

export const AddPost = () => {
  const { register, handleSubmit, setValue } =
    useForm<FormData>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useAppSelector(postsSelector);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(createPost(data));
    dispatch(asyncUploadPost(data));
    setValue("body", "");
    setValue("title", "");
  });
  return (
    <>
      <h2>Добавить пост</h2>

      <FormWrap onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          {...register("title")}
          id="title"
        />

        <label htmlFor="body">Body</label>
        <input
          type="text"
          {...register("body")}
          id="body"
        />

        <input type="submit" value="Отправить" />
      </FormWrap>

      {posts.map((el: Posts) => (
        <Post
          key={el.id}
          id={el.id}
          title={el.title}
          body={el.body}
          isEditing={el.isEditing!}
        />
      ))}
    </>
  );
};
