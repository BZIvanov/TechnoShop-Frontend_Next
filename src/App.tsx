import { Outlet } from "react-router";
import Container from "@mui/material/Container";

import AppNotification from "@/components/common/feedback/AppNotification";
import AppConfirmDialog from "@/components/common/dialogs/AppConfirmDialog";
import { useGetCurrentUserQuery } from "@/providers/store/services/users";

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <Container maxWidth="xl">
      <Outlet />

      <AppNotification />

      <AppConfirmDialog />
    </Container>
  );
};

export default App;
