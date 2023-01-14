import { configureStore } from '@reduxjs/toolkit';

import modalsReducer from './features/modal/modal.slice';

// ...

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
