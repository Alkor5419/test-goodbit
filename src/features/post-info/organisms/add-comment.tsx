import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "shared/model";
import { asyncMakeComment } from "../model/post-info-slice";
const AddCommentInput = styled.textarea`
  border-radius: 5px;
  margin-right: 20px;
  width: 500px;
`;
type FormData = {
  text: string;
};

type Props = {
  currentId: number;
};
export const AddComment: React.FC<Props> = ({
  currentId,
}) => {
  const { register, handleSubmit, setValue } =
    useForm<FormData>();
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(asyncMakeComment(currentId, data.text));
    setValue("text", "");
  });
  return (
    <>
      <h2>Написать комментарий</h2>
      <form onSubmit={onSubmit}>
        <AddCommentInput
          {...(register("text"), { maxLength: 64 })}
        />
        <input type="submit" value="Отправить" />
      </form>
    </>
  );
};
