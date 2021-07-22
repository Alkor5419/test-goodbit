import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card } from "antd";
import { Space } from "antd";
import { useAppDispatch } from "shared/model";
import {
  CheckIcon,
  CrossIcon,
  EditIcon,
} from "shared/ui/atoms";
import {
  changeEditStatus,
  asyncDeletePost,
  asyncUpdatePost,
} from "../model/posts-slice";

const CardInput = styled.input`
  border: 0;
  background-color: #fff;
  width: 90%;
`;
const HiddenInput = styled.input`
  display: none;
`;
const BodyWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
type Props = {
  id: number;
  title: string;
  body: string;
  isEditing: boolean;
};

type FormData = {
  title: string;
  body: string;
};

export const Post: React.FC<Props> = ({
  id,
  title,
  body,
  isEditing,
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    dispatch(asyncUpdatePost(id, data));
    dispatch(changeEditStatus(id));
  });

  return (
    <form onSubmit={onSubmit}>
      <Card
        title={
          <CardInput
            type="text"
            defaultValue={title}
            {...register("title")}
            disabled={isEditing ? false : true}
          />
        }
        extra={
          <Space size="small">
            {isEditing ? (
              <label>
                <HiddenInput type="submit" />
                <CheckIcon />
              </label>
            ) : (
              <EditIcon
                onClick={() =>
                  dispatch(changeEditStatus(id))
                }
              />
            )}
            <CrossIcon
              onClick={() => dispatch(asyncDeletePost(id))}
            />
          </Space>
        }
        style={{ width: 700, marginTop: 16 }}
      >
        <BodyWrap>
          <CardInput
            type="text"
            defaultValue={body}
            {...register("body")}
            disabled={isEditing ? false : true}
          />
          <Link to={`/posts/${id}`}>Подробнее</Link>
        </BodyWrap>
      </Card>
    </form>
  );
};
