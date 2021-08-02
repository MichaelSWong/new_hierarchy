import { createTheme } from '@material-ui/core/styles';

//* Creating a new theme
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    primary: { main: '#808080', contrastText: '#fff' },
  },
  overrides: {
    MuiMenuItem: {
      root: {
        '&&:hover': {
          backgroundColor: '#A32638',
          color: 'white',
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        ul: {
          listStyle: 'none',
        },
      },
    },
  },
});

export default theme;
