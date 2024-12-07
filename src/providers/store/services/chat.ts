import { api } from "./api";
import {
  ChatMessagesParams,
  ChatMessagesResponse,
  ChatParams,
  ChatResponse,
  ChatsResponse,
  CreateChatInput,
} from "./types/chat";

export const chatApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getChats: build.query<ChatsResponse, void>({
        query: () => {
          return {
            url: "/chats",
            method: "GET",
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.chats.map(({ _id }) => ({
                  type: "Chats" as const,
                  id: _id,
                })),
                { type: "Chats" as const, id: "LIST" },
              ]
            : [{ type: "Chats" as const, id: "LIST" }];
        },
      }),
      getChat: build.query<ChatResponse, ChatParams>({
        query: ({ receiverId }) => {
          return {
            url: `/chats/${receiverId}`,
            method: "GET",
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return [{ type: "Chats" as const, id: result?.chat._id }];
        },
      }),
      getChatMessages: build.query<ChatMessagesResponse, ChatMessagesParams>({
        query: ({ chatId }) => {
          return {
            url: `/chats/${chatId}/messages`,
            method: "GET",
            credentials: "include",
          };
        },
      }),
      createChat: build.mutation<ChatResponse, CreateChatInput>({
        query: (data) => {
          return {
            url: "/chats",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
        invalidatesTags: () => {
          return [{ type: "Chats", id: "LIST" }];
        },
      }),
    };
  },
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetChatMessagesQuery,
  useCreateChatMutation,
} = chatApi;
