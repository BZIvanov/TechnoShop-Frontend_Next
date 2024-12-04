import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { usersApi } from '../../services/users';
import { User } from '../../services/types/users';

interface UserState {
  user: User | null;
  initialLoadingCompleted: boolean;
}

const initialState: UserState = {
  user: null,
  initialLoadingCompleted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.initialLoadingCompleted = true;
        }
      )
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.initialLoadingCompleted = true;
      })
      .addMatcher(usersApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        usersApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.initialLoadingCompleted = true;
        }
      )
      .addMatcher(usersApi.endpoints.getCurrentUser.matchRejected, (state) => {
        state.user = null;
        state.initialLoadingCompleted = true;
      });
  },
});

export default userSlice.reducer;

export const selectUser = (state: RootState): User | null => state.user.user;
export const selectUserInitialLoadingCompleted = (state: RootState): boolean =>
  state.user.initialLoadingCompleted;
