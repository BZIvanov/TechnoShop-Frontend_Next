import { useState, type FC, type MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import {
  clearCart,
  selectCart,
} from "@/providers/store/features/cart/cartSlice";
import { useLogoutMutation } from "@/providers/store/services/users";
import MenuItemNavLink from "./MenuItemNavLink";

const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

interface HeaderRightNavProps {
  shouldRenderSidebar: boolean;
}

const HeaderRightNav: FC<HeaderRightNavProps> = ({ shouldRenderSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const [logout] = useLogoutMutation();

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    dispatch(clearCart());
    navigate("/auth/login");
  };

  return (
    <>
      {/* Full screen icons */}
      <Box
        sx={{
          display: { xs: "none", md: "flex", gap: 5, alignItems: "center" },
        }}
      >
        {!shouldRenderSidebar && (
          <Tooltip title="Cart">
            <NavLink
              to="/cart"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? theme.palette.common.black : "inherit",
              })}
            >
              <IconButton size="large" color="inherit">
                <Badge badgeContent={Object.keys(cart).length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
          </Tooltip>
        )}

        {user ? (
          <Tooltip title={`${user.username} - ${user.role}`}>
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar alt="User profile" src={user?.avatar?.imageUrl} />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            size="large"
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        )}
      </Box>

      {/* Mobile screen icon */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
          <MoreIcon />
        </IconButton>
      </Box>

      {/* Mobile screen menu */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted={true}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={handleMobileMenuClose}
      >
        {!shouldRenderSidebar && (
          <MenuItem
            onClick={handleMenuClose}
            component={MenuItemNavLink}
            to="/cart"
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <Badge badgeContent={Object.keys(cart).length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            Cart
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={handleProfileMenuOpen}>
            <Avatar
              alt="User profile"
              src={user?.avatar?.imageUrl}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            Manage
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
        {!user && (
          <MenuItem onClick={handleProfileMenuOpen}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            Account
          </MenuItem>
        )}
      </Menu>

      {/* Full screen menu. Keep this menu below mobile so the nested menu to be rendered above the other menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted={true}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {user && (
          <MenuItem
            onClick={handleMenuClose}
            component={MenuItemNavLink}
            to={`/${user.role}/dashboard`}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <DashboardIcon />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        )}
        {user && !mobileMoreAnchorEl && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
        {!user && (
          <MenuItem
            onClick={handleMenuClose}
            component={MenuItemNavLink}
            to="/auth/login"
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LoginIcon />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
        {!user && (
          <MenuItem
            onClick={handleMenuClose}
            component={MenuItemNavLink}
            to="/auth/register"
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <AppRegistrationIcon />
            </ListItemIcon>
            Register
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default HeaderRightNav;
