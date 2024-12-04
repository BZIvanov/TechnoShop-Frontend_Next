import { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useSelector, useDispatch } from '@/providers/store/hooks';
import {
  selectNotification,
  hideNotification,
} from '@/providers/store/features/notification/notificationSlice';

interface AppNotificationProps {
  autoHideDuration?: number;
}

const AppNotification: FC<AppNotificationProps> = ({
  autoHideDuration = 3000,
}) => {
  const dispatch = useDispatch();

  const { type, message } = useSelector(selectNotification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <>
      {message ? (
        <Snackbar
          open={!!message}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default AppNotification;
