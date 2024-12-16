import { useState, type FC, type MouseEvent } from "react";
import { NavLink } from "react-router";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useTheme } from "@mui/material/styles";

import MenuItemNavLink from "./MenuItemNavLink";

const HeaderLeftNav: FC = () => {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      {/* Mobile screen menu */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="shop-menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          keepMounted={true}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem
            onClick={handleCloseNavMenu}
            component={MenuItemNavLink}
            to="/"
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeIcon />
            </ListItemIcon>
            Home
          </MenuItem>

          <MenuItem
            onClick={handleCloseNavMenu}
            component={MenuItemNavLink}
            to="/shop"
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <StorefrontIcon />
            </ListItemIcon>
            Shop
          </MenuItem>
        </Menu>
      </Box>

      {/* Full screen icons */}
      <Box
        sx={{
          display: { xs: "none", md: "flex", alignItems: "center", gap: 5 },
        }}
      >
        <Tooltip title="Home">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.palette.common.black : "inherit",
            })}
          >
            <IconButton
              onClick={handleCloseNavMenu}
              size="large"
              sx={{ color: "inherit" }}
            >
              <HomeIcon />
            </IconButton>
          </NavLink>
        </Tooltip>

        <Tooltip title="Shop">
          <NavLink
            to="/shop"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.palette.common.black : "inherit",
            })}
          >
            <IconButton
              onClick={handleCloseNavMenu}
              size="large"
              sx={{ color: "inherit" }}
            >
              <StorefrontIcon />
            </IconButton>
          </NavLink>
        </Tooltip>
      </Box>
    </>
  );
};

export default HeaderLeftNav;
