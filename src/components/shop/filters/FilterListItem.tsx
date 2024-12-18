import { type ReactNode, type PropsWithChildren, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FilterListItemProps {
  title: string;
  icon: ReactNode;
}

const FilterListItem = ({
  title,
  icon,
  children,
}: PropsWithChildren<FilterListItemProps>) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Box sx={{ width: "100%", marginTop: "5px" }}>
      <ListItemButton onClick={() => setOpen((prevValue) => !prevValue)}>
        <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit={false}>
        {children}
      </Collapse>
    </Box>
  );
};

export default FilterListItem;
