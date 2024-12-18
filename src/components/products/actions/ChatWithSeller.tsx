import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";

interface ChatWithSellerProps {
  productId: string;
  shopSellerId: string;
}

const ChatWithSeller = ({ productId, shopSellerId }: ChatWithSellerProps) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <Button
      onClick={() => {
        if (!user) {
          navigate("/auth/login", {
            state: {
              customNavigateTo: `/products/${productId}`,
            },
          });
        } else {
          navigate(`/buyer/chat/${shopSellerId}`);
        }
      }}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <ChatIcon />
      <Typography variant="caption">Chat with Seller</Typography>
    </Button>
  );
};

export default ChatWithSeller;
