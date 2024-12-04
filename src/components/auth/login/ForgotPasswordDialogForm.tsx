import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmailIcon from '@mui/icons-material/Email';

import { useDispatch } from '@/providers/store/hooks';
import { useForm } from '@/components/form/hooks/useForm';
import { useForgotPasswordMutation } from '@/providers/store/services/users';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import TextFieldAdapter from '@/components/form/fields/TextFieldAdapter';
import { schema, ForgotPasswordFormData } from './forgotPassword.schema';

const ForgotPasswordDialogForm = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<ForgotPasswordFormData>({
    schema,
    defaultValues: { email: '' },
  });

  const handleCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
  };

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (values) => {
    const result = await forgotPassword(values);

    if (!('error' in result)) {
      handleCloseDialog();

      dispatch(
        showNotification({
          type: 'success',
          message: 'Password reset link sent. Please check your email.',
        })
      );
    }
  };

  return (
    <>
      <Button
        color='secondary'
        size='small'
        onClick={() => setIsDialogOpen(true)}
      >
        Forgot Password?
      </Button>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: form.handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>Forgot Password</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To reset your password provide your e-mail for reset password link.
          </DialogContentText>

          <TextFieldAdapter
            control={form.control}
            name='email'
            label='Email'
            icon={<EmailIcon />}
          />
        </DialogContent>

        <DialogActions>
          <Button
            color='secondary'
            type='button'
            onClick={handleCloseDialog}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button color='secondary' type='submit' disabled={isLoading}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ForgotPasswordDialogForm;
