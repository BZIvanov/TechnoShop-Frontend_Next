import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

import { RootState } from '../../store';

interface UserState {
  type: AlertColor;
  message: string;
}

const initialState: UserState = {
  type: 'info',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { type, message } = action.payload;

      state.type = type;
      state.message = message;
    },
    hideNotification: () => {
      return initialState;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectNotification = (state: RootState) => state.notification;
