import { useEffect, useMemo, useState } from "react";
import io, { type Socket } from "socket.io-client";
import Box from "@mui/material/Box";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import { useGetChatsQuery } from "@/providers/store/services/chat";
import { UserStatuses } from "@/components/manage/common/chat/chat-types";
import ChatHeader from "@/components/manage/common/chat/ChatHeader";
import ChatMessages from "@/components/manage/common/chat/ChatMessages";
import ChatForm from "@/components/manage/common/chat/ChatForm";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SellerAdminChat = () => {
  const user = useSelector(selectUser);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [userStatuses, setUserStatuses] = useState<UserStatuses>({});

  const { data: chatsData } = useGetChatsQuery();
  const chatData = useMemo(
    () => chatsData?.chats.find((chat) => chat.chatType === "seller-admin"),
    [chatsData]
  );
  const chatId = useMemo(() => chatData?._id, [chatData]);

  const receiverId = useMemo(() => {
    if (chatData) {
      return chatData.participants.find(
        (participant) => participant.user._id !== user?._id
      )?.user?._id;
    }
    return null;
  }, [user, chatData]);

  useEffect(() => {
    let newSocket: Socket | undefined;

    if (user) {
      newSocket = io(backendUrl, {
        query: { userId: user._id },
      });
      setSocket(newSocket);

      newSocket.on("activeUsers", (activeUsersList: string[]) => {
        const activeUsersListStatuses = activeUsersList.reduce<UserStatuses>(
          (acc, curr) => {
            return { ...acc, [curr]: "online" };
          },
          {}
        );

        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          ...activeUsersListStatuses,
        }));
      });

      newSocket.on(
        "userStatus",
        ({
          userId,
          status,
        }: {
          userId: string;
          status: "online" | "offline";
        }) => {
          setUserStatuses((prevStatuses) => ({
            ...prevStatuses,
            [userId]: status,
          }));
        }
      );
    }

    return () => {
      if (newSocket) {
        newSocket.off("userStatus");
        newSocket.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit("joinChat", { chatId });
    }
  }, [socket, chatId]);

  return (
    <Box sx={{ margin: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <ChatHeader
            chat={chatData}
            receiverId={receiverId || ""}
            userStatuses={userStatuses}
          />

          <ChatMessages socket={socket} chatId={chatId || ""} />

          <ChatForm socket={socket} chatId={chatId || ""} />
        </Box>
      </Box>
    </Box>
  );
};

export default SellerAdminChat;
