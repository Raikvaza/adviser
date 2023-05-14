import { createTheme } from '@mui/material/styles';

const shadesOfWhite = {
  lighter: '#fafafa',
  light: '#F6F6F7',
  main: '#ffffff',
  dark: '#e0e0e0',
  darker: '#d6d6d6',
  contrastText: '#000000',
};

const themeOptions = {
  palette: {
    mode: 'light',
    primary: shadesOfWhite,
    secondary: {
      main: '#9BACD1',
    },
  },
  typography: {
    fontFamily: [
      'RUS ModernH-Bold',
      'DejaVuSans',
      'Roboto',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  spacing: 8,
  components: {
    MuiAppBar: {
      variants: [
        {
          props: { color: 'inherit' },
          style: {
            backgroundColor: '#689f38',
            color: '#fff',
          },
        },
      ],
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;