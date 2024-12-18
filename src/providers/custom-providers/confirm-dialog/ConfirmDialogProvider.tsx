import { type PropsWithChildren, useState } from "react";
import ConfirmDialogContext, {
  type DialogConfig,
} from "./ConfirmDialogContext";

const ConfirmDialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    open: false,
    text: "",
    onConfirm: () => {},
  });

  const openDialog = ({ text, onConfirm }: Omit<DialogConfig, "open">) => {
    setDialogConfig({
      open: true,
      text,
      onConfirm,
    });
  };

  const closeDialog = () => {
    setDialogConfig({
      open: false,
      text: "",
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
