import { createTheme } from '@mui/material/styles';

// here we can rewrite defaults for the theme
const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'sans-serif'].join(','),
  },
});

export default theme;
