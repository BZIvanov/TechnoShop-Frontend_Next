import { type PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface InfoTextListItemProps {
  itemKey: string;
}

const InfoTextListItem = ({
  itemKey,
  children,
}: PropsWithChildren<InfoTextListItemProps>) => {
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
