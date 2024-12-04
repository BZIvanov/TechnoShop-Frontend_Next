import { createContext } from 'react';

export interface DialogConfig {
  open: boolean;
  text: string;
  onConfirm: () => void;
}

interface ConfirmDialogContextType {
  dialogConfig: DialogConfig;
  openDialog: (config: Omit<DialogConfig, 'open'>) => void;
  closeDialog: () => void;
}

const ConfirmDialogContext = createContext<
  ConfirmDialogContextType | undefined
>(undefined);

export default ConfirmDialogContext;
