import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import {
  fetchComments,
  fetchPost,
  makeComment,
  updateComment,
  delComment,
} from "shared/api";

type InitialState = {
  loading: boolean;
  error: string | unknown;
  post: [] | Post;
  comments: Comments[];
};
type Post = {
  id: number;
  title: string;
  body: string;
  isEditing: boolean;
};
export type Comments = {
  id: number;
  postId: number;
  text: string;
  isEditing?: boolean;
};

export const getPost = createAsyncThunk(
  "post-info/get-post",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchPost(id);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getComments = createAsyncThunk(
  "post-info/get-comments",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchComments(id);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const asyncMakeComment =
  (postId: number, comment: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await makeComment(postId, comment);
      dispatch(createComment(data));
    } catch (e) {
      console.log(e);
    }
  };

export const asyncUpdateComment =
  (id: number, postId: number, comment: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await updateComment(id, postId, comment);
      dispatch(changeComment(data));
    } catch (e) {
      console.log(e);
    }
  };

export const asyncDeleteComment =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      await delComment(id);
      dispatch(deleteComment(id));
    } catch (e) {
      console.log(e);
    }
  };

const initialState: InitialState = {
  loading: false,
  error: "",
  post: [],
  comments: [],
};

const postInfoSlice = createSlice({
  name: "post-info",
  initialState,
  reducers: {
    createComment: (
      state,
      action: PayloadAction<Comments>
    ) => {
      state.comments.push({
        ...action.payload,
        isEditing: false,
      });
    },
    changeEditStatus: (
      state,
      action: PayloadAction<number>
    ) => {
      const index = state.comments.findIndex(
        (el: Comments) => el.id === action.payload
      );
      state.comments[index].isEditing =
        !state.comments[index].isEditing;
    },
    changeComment: (state, action) => {
      const index = state.comments.findIndex(
        (el: Comments) => el.id === action.payload.id
      );
      state.comments[index].text = action.payload.text;
    },
    deleteComment: (
      state,
      action: PayloadAction<number>
    ) => {
      state.comments = state.comments.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = {
          ...action.payload,
          isEditing: false,
        };
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      });
  },
});

const selectSelf = (state: RootState) =>
  state.postInfoReducer;
export const postSelector = createSelector(
  selectSelf,
  (state) => state.post
);
export const commentsSelector = createSelector(
  selectSelf,
  (state) => state.comments
);

export default postInfoSlice.reducer;

export const {
  createComment,
  changeEditStatus,
  changeComment,
  deleteComment,
} = postInfoSlice.actions;
