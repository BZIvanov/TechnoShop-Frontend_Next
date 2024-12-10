import { useEffect, useState, FC } from "react";
import { Outlet } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import HeaderLeftNav from "./HeaderLeftNav";
import HeaderSearch from "./HeaderSearch";
import HeaderRightNav from "./HeaderRightNav";
import ManagementSidebarDrawer from "./ManagementSidebarDrawer";
import { DRAWER_WIDTH } from "./constants";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

interface HeaderProps {
  shouldRenderSidebar?: boolean;
}

const Header: FC<HeaderProps> = ({ shouldRenderSidebar = false }) => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);

  const handleSidebarDrawerOpen = () => {
    setIsSidebarDrawerOpen(true);
  };

  const handleSidebarDrawerClose = () => {
    setIsSidebarDrawerOpen(false);
  };

  useEffect(() => {
    if (isBelowMd) {
      setIsSidebarDrawerOpen(false);
    }
  }, [isBelowMd]);

  const AppBarToRender = shouldRenderSidebar ? AppBar : MuiAppBar;

  return (
    <>
      <AppBarToRender position="fixed" open={isSidebarDrawerOpen}>
        <Toolbar>
          {shouldRenderSidebar && !isBelowMd && (
            <IconButton
              size="large"
              color="inherit"
              onClick={handleSidebarDrawerOpen}
              edge="start"
              sx={[
                { marginRight: 1 },
                isSidebarDrawerOpen && { display: "none" },
              ]}
            >
              <ListIcon />
            </IconButton>
          )}

          <HeaderLeftNav />

          {!shouldRenderSidebar && <HeaderSearch />}

          <Box sx={{ flexGrow: 1 }} />

          <HeaderRightNav shouldRenderSidebar={shouldRenderSidebar} />
        </Toolbar>
      </AppBarToRender>
      {/* Render second toolbar so the page content won't hide behind the first ttolbar  */}
      <Toolbar />

      <Box sx={{ display: "flex" }}>
        {shouldRenderSidebar && (
          <ManagementSidebarDrawer
            isSidebarDrawerOpen={isSidebarDrawerOpen}
            closeDrawer={handleSidebarDrawerClose}
          />
        )}

        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          {/* Here is the page content */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Header;
