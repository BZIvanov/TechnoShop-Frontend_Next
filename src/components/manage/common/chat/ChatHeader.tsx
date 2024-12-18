import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

import { Chat } from "@/providers/store/services/types/chat";
import { UserStatuses } from "./chat-types";

interface ChatHeaderProps {
  chat?: Chat;
  receiverId: string;
  userStatuses: UserStatuses;
}

const ChatHeader = ({ chat, receiverId, userStatuses }: ChatHeaderProps) => {
  const receiver = chat?.participants?.find(
    (participant) => participant.user._id === receiverId
  );

  const isOnline = userStatuses[receiverId] === "online";

  return (
    <Paper sx={{ p: 1 }}>
      {receiverId ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            sx={{
              "& .MuiBadge-dot": {
                backgroundColor: isOnline ? "green" : "red",
              },
            }}
          >
            <Avatar src={receiver?.user?.avatar?.imageUrl} alt="User avatar" />
          </Badge>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {receiver?.user.username}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
          <Typography variant="body1">Select a user to chat with</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ChatHeader;
