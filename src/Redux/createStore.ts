import { configureStore } from "@reduxjs/toolkit";
import sectionsReducer from "./slices/section";
import pageTransitionReducer from "./slices/pageTransition";

const createStore = () =>
  configureStore({
    reducer: {
      sections: sectionsReducer,
      pageTransition: pageTransitionReducer,
    },
  });

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
