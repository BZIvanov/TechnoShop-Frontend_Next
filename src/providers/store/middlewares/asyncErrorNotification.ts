import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

import { showNotification } from '../features/notification/notificationSlice';

type ErrorPayload = {
  data: {
    error: string;
  };
};

// dispatch notification action which will be used by MUI Snackbar to display the Alert as a global app component
export const asyncErrorNotification: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const errorPayload = action.payload as ErrorPayload;

      if (errorPayload?.data?.error) {
        dispatch(
          showNotification({
            type: 'error',
            message: errorPayload.data.error,
          })
        );
      }
    }

    return next(action);
  };
