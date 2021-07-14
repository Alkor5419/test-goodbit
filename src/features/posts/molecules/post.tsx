import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Space } from "antd";
import {
  CheckIcon,
  CrossIcon,
  EditIcon,
} from "shared/ui/atoms";

const CardInput = styled.input`
  border: 0;
  background-color: #fff;
`;
type Props = {
  id: number;
  title: string;
  body: string;
  isEdited: boolean;
};

export const Post: React.FC<Props> = ({
  id,
  title,
  body,
  isEdited,
}) => {
  return (
    <Card
      title={
        <CardInput type="text" value={title} disabled />
      }
      extra={
        <Space size="small">
          {isEdited ? <CheckIcon /> : <EditIcon />}
          <CrossIcon />
        </Space>
      }
      style={{ width: 300 }}
    >
      {<CardInput type="text" value={body} disabled />}
    </Card>
  );
};
