import { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router';
import { useTheme } from '@mui/material/styles';

type MenuItemNavLinkProps = Omit<NavLinkProps, 'to'> & {
  to: NavLinkProps['to']; // Ensure `to` is correctly typed
};

const MenuItemNavLink = forwardRef<HTMLAnchorElement, MenuItemNavLinkProps>(
  (props, ref) => {
    const { to, ...rest } = props;

    const theme = useTheme();

    return (
      <NavLink
        {...rest}
        ref={ref}
        to={to}
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? theme.palette.primary.main : 'inherit',
        })}
      />
    );
  }
);

export default MenuItemNavLink;
