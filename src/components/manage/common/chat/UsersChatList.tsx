import { FC } from "react";
import { Link, useParams } from "react-router";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import List from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import { Chat } from "@/providers/store/services/types/chat";
import { UserStatuses } from "./chat-types";

interface UsersChatListProps {
  title: string;
  chats: Chat[];
  userStatuses: UserStatuses;
}

const UsersChatList: FC<UsersChatListProps> = ({
  chats = [],
  userStatuses,
  title,
}) => {
  const { receiverId } = useParams();

  const user = useSelector(selectUser);

  return (
    <Paper sx={{ width: 280, pb: 0 }}>
      <Typography variant="h6" gutterBottom={true} p={1}>
        {title}
      </Typography>

      <List sx={{ m: 1, p: 1 }}>
        {chats.map((chat) => {
          const receiver = chat.participants.find(
            (participant) => participant.user._id !== user?._id
          );

          if (!receiver) {
            return null;
          }

          const isOnline = userStatuses[receiver.user._id] === "online";

          return (
            <ListItem
              key={chat._id}
              component={Link}
              to={`/${user?.role}/chat/${receiver.user._id}`}
              sx={{
                mb: 1,
                borderRadius: 1,
                backgroundColor:
                  receiverId === receiver.user._id
                    ? "lightgrey"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "darkgrey",
                },
                textDecoration: "none",
              }}
            >
              <ListItemAvatar>
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
                  <Avatar
                    src={receiver.user?.avatar?.imageUrl}
                    alt="User avatar"
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="bold">
                    {receiver.user.username}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default UsersChatList;
