import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import {
  fetchPosts,
  makePost,
  delPost,
  updatePost,
} from "shared/api";

type Payload = {
  title: string;
  body: string;
};
type InitialState = {
  loading: boolean;
  error: string | unknown;
  posts: Posts[];
};
export type Posts = {
  id: number;
  title: string;
  body: string;
  isEditing?: boolean;
};

export const getPosts = createAsyncThunk(
  "posts/get-posts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPosts();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const asyncUploadPost = createAsyncThunk(
  "posts/async-upload-post",
  async (post: Payload) => {
    try {
      const data = await makePost(
        post,
        postsSelector.length + 3
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const asyncDeletePost =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      await delPost(id);
      dispatch(deletePost(id));
    } catch (e) {
      console.log(e);
    }
  };

export const asyncUpdatePost =
  (id: number, data: Payload): AppThunk =>
  async (dispatch) => {
    try {
      await updatePost(id, data);
      dispatch(changePost({ id, ...data }));
    } catch (e) {
      console.log(e);
    }
  };

const initialState: InitialState = {
  loading: false,
  error: "",
  posts: [],
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<Payload>) => {
      state.posts[state.posts.length] = {
        id: state.posts.length + 1,
        ...action.payload,
        isEditing: false,
      };
    },
    changeEditStatus: (state, action) => {
      state.posts[action.payload - 1].isEditing =
        !state.posts[action.payload - 1].isEditing;
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(
        ({ id }) => id !== action.payload
      );
    },
    changePost: (state, action: PayloadAction<Posts>) => {
      state.posts[action.payload.id - 1] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        const newActionData = action.payload.map(
          (el: Posts) => {
            el.isEditing = false;
            return el;
          }
        );
        state.posts = newActionData;
      })
      .addCase(asyncUploadPost.pending, (state) => state)
      .addCase(asyncUploadPost.fulfilled, (state) => state);
  },
});

const selectSelf = (state: RootState) => state.postsReducer;
export const postsSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.posts
);

export default postsSlice.reducer;

export const {
  createPost,
  changeEditStatus,
  deletePost,
  changePost,
} = postsSlice.actions;
