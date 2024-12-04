import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useConfirmDialog } from '@/providers/custom-providers/confirm-dialog/useConfirmDialog';

const AppConfirmDialog: FC = () => {
  const { dialogConfig, closeDialog } = useConfirmDialog();

  const { open, text, onConfirm } = dialogConfig;

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus={true}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;
