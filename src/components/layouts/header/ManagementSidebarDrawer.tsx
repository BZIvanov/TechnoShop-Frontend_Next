import { FC } from 'react';
import { NavLink } from 'react-router';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import { useSelector } from '@/providers/store/hooks';
import { selectUser } from '@/providers/store/features/user/userSlice';
import { roleLinks } from './role-links';
import { DRAWER_WIDTH } from './constants';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

interface ManagementSidebarDrawerProps {
  isSidebarDrawerOpen: boolean;
  closeDrawer: () => void;
}

const ManagementSidebarDrawer: FC<ManagementSidebarDrawerProps> = ({
  isSidebarDrawerOpen,
  closeDrawer,
}) => {
  const theme = useTheme();

  const user = useSelector(selectUser);

  // we will have the user with the protected routes, this check is just for typescript
  if (!user) {
    return null;
  }

  const sidebarMenuLinks = roleLinks[user.role];

  return (
    <Drawer variant='permanent' open={isSidebarDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={closeDrawer}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarMenuLinks.map((sidebarMenuLink) => (
          <NavLink
            key={sidebarMenuLink.toLink}
            style={({ isActive }) => {
              return {
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.common.black,
                textDecoration: 'none',
              };
            }}
            to={sidebarMenuLink.toLink}
          >
            <ListItem disablePadding={true} sx={{ display: 'block' }}>
              <Tooltip
                title={!isSidebarDrawerOpen ? sidebarMenuLink.linkText : ''}
                placement='right'
              >
                <ListItemButton
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    isSidebarDrawerOpen
                      ? { justifyContent: 'initial' }
                      : { justifyContent: 'center' },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                        color: 'inherit',
                      },
                      isSidebarDrawerOpen ? { mr: 3 } : { mr: 'auto' },
                    ]}
                  >
                    {sidebarMenuLink.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={sidebarMenuLink.linkText}
                    sx={[isSidebarDrawerOpen ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default ManagementSidebarDrawer;
