import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import AvatarUpdate from "./AvatarUpdate";
import PasswordUpdate from "./PasswordUpdate";

const UserProfile = () => {
  return (
    <Box>
      <AvatarUpdate />

      <Divider style={{ margin: "20px 0" }} />

      <PasswordUpdate />
    </Box>
  );
};

export default UserProfile;
