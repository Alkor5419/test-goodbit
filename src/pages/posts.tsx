import { AddPost } from "features/posts/organisms";
import { MainTemplate } from "shared/ui/templates/main-template";
import React from "react";

export const Posts: React.FC = () => {
  return (
    <MainTemplate>
      <AddPost />
    </MainTemplate>
  );
};
