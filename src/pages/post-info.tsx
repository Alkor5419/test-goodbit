import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/model";
import {
  getComments,
  getPost,
  Comments,
  postSelector,
  commentsSelector,
} from "features/post-info/model/post-info-slice";
import { MainTemplate } from "shared/ui/templates/main-template";
import { AddComment } from "features/post-info/organisms/add-comment";
import { Comment } from "features/post-info/organisms/comment";
import { Card } from "antd";

export const PostInfo = () => {
  let location = useLocation();

  //Разбиваю строку на элементы, беру id как последний элемент массива.
  //currentId=postId
  const currentId = +location.pathname.split("/")[2];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPost(currentId));
    dispatch(getComments(currentId));
  }, [dispatch, currentId]);

  const comments = useAppSelector(commentsSelector);
  const post: any = useAppSelector(postSelector);

  return post ? (
    <MainTemplate>
      <Card
        title={post.title}
        extra={<Link to="/posts">Back</Link>}
        style={{
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <p>{post.body}</p>
      </Card>

      {comments
        ? comments.map((el: Comments) => (
            <Comment
              key={el.id}
              text={el.text}
              id={el.id}
              postId={currentId}
              isEditing={el.isEditing!}
            />
          ))
        : null}
      <AddComment currentId={currentId} />
    </MainTemplate>
  ) : null;
};
