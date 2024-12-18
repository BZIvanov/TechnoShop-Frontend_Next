import { type SubmitHandler } from "react-hook-form";
import { type Socket } from "socket.io-client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import { useForm } from "@/components/form/hooks/useForm";
import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import { schema, ChatFormData } from "./chatForm.schema";

interface ChatFormProps {
  socket: Socket | null;
  chatId: string;
}

const defaultValues = { message: "" };

const ChatForm = ({ socket, chatId }: ChatFormProps) => {
  const user = useSelector(selectUser);

  const form = useForm<ChatFormData>({
    schema,
    defaultValues,
  });

  const onSubmit: SubmitHandler<ChatFormData> = (values: ChatFormData) => {
    if (socket && chatId) {
      socket.emit("sendMessage", {
        chatId,
        senderId: user?._id,
        content: values.message,
      });

      form.reset();
    }
  };

  return (
    <Box sx={{ margin: 1 }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextFieldAdapter
            control={form.control}
            name="message"
            label="Your message"
            disabled={!chatId}
          />

          <Box>
            <Button variant="contained" type="submit" disabled={!chatId}>
              Send
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ChatForm;
