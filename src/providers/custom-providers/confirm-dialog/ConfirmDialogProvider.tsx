import { FC, ReactNode, useState } from 'react';
import ConfirmDialogContext, { DialogConfig } from './ConfirmDialogContext';

interface ConfirmDialogProviderProps {
  children: ReactNode;
}

const ConfirmDialogProvider: FC<ConfirmDialogProviderProps> = ({
  children,
}) => {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    open: false,
    text: '',
    onConfirm: () => {},
  });

  const openDialog = ({ text, onConfirm }: Omit<DialogConfig, 'open'>) => {
    setDialogConfig({
      open: true,
      text,
      onConfirm,
    });
  };

  const closeDialog = () => {
    setDialogConfig({
      open: false,
      text: '',
      onConfirm: () => {},
    });
  };

  return (
    <ConfirmDialogContext.Provider
      value={{ dialogConfig, openDialog, closeDialog }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogProvider;
