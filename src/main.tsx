import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import StoreProvider from "@/providers/store/StoreProvider";
import MuiThemeProvider from "@/providers/theme/MuiThemeProvider";
import BrowserRouterProvider from "@/providers/router/BrowserRouterProvider";
import ConfirmDialogProvider from "@/providers/custom-providers/confirm-dialog/ConfirmDialogProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <MuiThemeProvider>
        <ConfirmDialogProvider>
          <BrowserRouterProvider />
        </ConfirmDialogProvider>
      </MuiThemeProvider>
    </StoreProvider>
  </StrictMode>
);
