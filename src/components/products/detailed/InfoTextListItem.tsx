import { type FC, type ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface InfoTextListItemProps {
  itemKey: string;
  children: ReactNode;
}

const InfoTextListItem: FC<InfoTextListItemProps> = ({ itemKey, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 1,
        alignItems: "center",
      }}
    >
      <Typography variant="body1">{itemKey}:</Typography>
      {children}
    </Box>
  );
};

export default InfoTextListItem;
