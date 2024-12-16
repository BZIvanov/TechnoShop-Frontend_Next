import { type FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import io, { Socket } from "socket.io-client";
import Box from "@mui/material/Box";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import {
  useCreateChatMutation,
  useGetChatQuery,
  useGetChatsQuery,
} from "@/providers/store/services/chat";
import { UserStatuses } from "@/components/manage/common/chat/chat-types";
import UsersChatList from "@/components/manage/common/chat/UsersChatList";
import ChatHeader from "@/components/manage/common/chat/ChatHeader";
import ChatMessages from "@/components/manage/common/chat/ChatMessages";
import ChatForm from "@/components/manage/common/chat/ChatForm";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminSellerChat: FC = () => {
  const user = useSelector(selectUser);

  const { receiverId } = useParams();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [userStatuses, setUserStatuses] = useState<UserStatuses>({});

  const { data: chatsData } = useGetChatsQuery();
  const { data: chatData } = useGetChatQuery(
    { receiverId: receiverId || "" },
    { skip: !receiverId }
  );
  const chatId = useMemo(() => chatData?.chat?._id, [chatData]);

  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    // if not chat was found and receiver/user id was provided, create the chat
    if (chatData && !chatData.chat && receiverId) {
      createChat({ receiverId });
    }
  }, [createChat, chatData, receiverId]);

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
        <UsersChatList
          chats={chatsData?.chats || []}
          userStatuses={userStatuses}
          title="Sellers"
        />

        <Box sx={{ flexGrow: 1 }}>
          <ChatHeader
            chat={chatData?.chat}
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

export default AdminSellerChat;
