import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useDispatch } from "@/providers/store/hooks";
import { useUpdateAvatarMutation } from "@/providers/store/services/users";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import AvatarUpdateForm from "./AvatarUpdateForm";

const AvatarUpdate: FC = () => {
  const dispatch = useDispatch();

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  const handleUpdateAvatar = async (
    formData: FormData,
    formSuccessCb: () => void
  ): Promise<void> => {
    const result = await updateAvatar(formData);

    if (!("error" in result)) {
      dispatch(
        showNotification({
          type: "success",
          message: "Avatar updated successfully",
        })
      );

      formSuccessCb();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "primary.main",
        }}
      >
        Update Your Avatar
      </Typography>

      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          bgcolor: "background.default",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <AvatarUpdateForm
          updateAvatar={handleUpdateAvatar}
          isSubmitting={isLoading}
        />
      </Box>
    </Box>
  );
};

export default AvatarUpdate;
