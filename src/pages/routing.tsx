import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PostInfo } from "./post-info";
import { Posts } from "./posts";

export const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route
          exact
          path="/posts/:id"
          component={PostInfo}
        />
        <Redirect to="/posts" />
      </Switch>
    </BrowserRouter>
  );
};
