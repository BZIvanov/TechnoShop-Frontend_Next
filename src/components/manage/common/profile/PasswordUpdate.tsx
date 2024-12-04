import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDispatch } from '@/providers/store/hooks';
import { useUpdatePasswordMutation } from '@/providers/store/services/users';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import PasswordUpdateForm from './PasswordUpdateForm';
import { PasswordUpdateFormData } from './passwordUpdateForm.schema';

const PasswordUpdate: FC = () => {
  const dispatch = useDispatch();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleUpdatePassword = async (
    formData: PasswordUpdateFormData,
    formSuccessCb: () => void
  ): Promise<void> => {
    const result = await updatePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Password updated successfully',
        })
      );

      formSuccessCb();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: 'primary.main',
        }}
      >
        Update Your Password
      </Typography>

      <Box
        sx={{
          width: { xs: '100%', sm: '400px' },
          bgcolor: 'background.default',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <PasswordUpdateForm
          updatePassword={handleUpdatePassword}
          isSubmitting={isLoading}
        />
      </Box>
    </Box>
  );
};

export default PasswordUpdate;
