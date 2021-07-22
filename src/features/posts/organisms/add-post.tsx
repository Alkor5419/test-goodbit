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
  isLoading,
} from "../model/posts-slice";
import { Spin } from "antd";

const FormWrap = styled.form`
  display: flex;
  justify-content: space-between;
`;
const AddPostInput = styled.input`
  border-radius: 5px;
`;
const SpinWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
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
  const loadingStatus = useAppSelector(isLoading);

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
        <AddPostInput
          type="text"
          {...register("title")}
          id="title"
        />

        <label htmlFor="body">Body</label>
        <AddPostInput
          type="text"
          {...register("body")}
          id="body"
        />

        <input type="submit" value="Отправить" />
      </FormWrap>
      {loadingStatus ? (
        <SpinWrap>
          <Spin size="large" />
        </SpinWrap>
      ) : (
        posts.map((el: Posts) => (
          <Post
            key={el.id}
            id={el.id}
            title={el.title}
            body={el.body}
            isEditing={el.isEditing!}
          />
        ))
      )}
    </>
  );
};
