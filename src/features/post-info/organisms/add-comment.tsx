import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "shared/model";
import { asyncMakeComment } from "../model/post-info-slice";
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
        <input type="text" {...register("text")} />
        <input type="submit" value="Отправить" />
      </form>
    </>
  );
};
