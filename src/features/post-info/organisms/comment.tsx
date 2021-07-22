import React from "react";
import { CrossIcon, EditIcon } from "shared/ui/atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "shared/model";
import {
  changeEditStatus,
  asyncUpdateComment,
  asyncDeleteComment,
} from "../model/post-info-slice";
import { Card, Space } from "antd";

const CommentInput = styled.input<InputProps>`
  border: ${(props) => (props.isEditing ? "1" : "0")};
  background-color: #fff;
  width: 500px;
  border-radius: 5px;
`;
const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const EditIconWithLayout = styled(EditIcon)`
  margin-right: 20px;
`;
type InputProps = {
  isEditing: boolean;
};
type Props = {
  text: string;
  id: number;
  isEditing: boolean;
  postId: number;
};
type FormData = {
  text: string;
};
export const Comment: React.FC<Props> = ({
  text,
  id,
  isEditing,
  postId,
}) => {
  const { register, handleSubmit, setValue } =
    useForm<FormData>();
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(asyncUpdateComment(id, postId, data.text));
    dispatch(changeEditStatus(id));
  });

  const handleClick = () => {
    setValue("text", `${text}`);
    dispatch(changeEditStatus(id));
  };
  const onEditClick = () => {
    dispatch(changeEditStatus(id));
  };
  return (
    <Card style={{ marginBottom: 16 }}>
      <CommentForm onSubmit={onSubmit}>
        <CommentInput
          type="text"
          defaultValue={text}
          {...(register("text"), { maxLength: 64 })}
          disabled={isEditing ? false : true}
          isEditing={isEditing}
        />
        <Space size="small">
          {isEditing ? (
            <div>
              <input type="submit" value="Сохранить" />
              <button onClick={handleClick}>
                Отменить
              </button>
            </div>
          ) : (
            <EditIconWithLayout onClick={onEditClick} />
          )}
          <CrossIcon
            onClick={() => dispatch(asyncDeleteComment(id))}
          />
        </Space>
      </CommentForm>
    </Card>
  );
};
