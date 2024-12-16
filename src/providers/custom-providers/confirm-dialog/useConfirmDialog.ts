import { useContext } from "react";

import ConfirmDialogContext from "./ConfirmDialogContext";

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error(
      "ConfirmDialogContext was used outside ConfirmDialogProvider"
    );
  }

  return context;
};
