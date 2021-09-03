import { ThemeOptions } from '@material-ui/core/styles/createTheme';

const themeOptions: ThemeOptions = {
  shape: {
    borderRadius: 15,
  },
  spacing: 10,
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + $track': {
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
  },
  typography: {
    fontFamily: 'Gilroy',
    button: {
      textTransform: 'none'
    },
  },
};

export const themeLightOptions: ThemeOptions = {
  ...themeOptions,
  palette: {
    type: 'light',
    primary: {
      main: '#0591da',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#EE1F9B',
      contrastText: 'rgba(255,255,255,0.87)',
      light: '#FFE2F9',
      dark: '#B4208A',
    },
    info: {
      main: '#90caf9',
    },
    error: {
      main: '#d32f2f',
    },
    divider: '#e5eff7',
  },
}

export const themeDarkOptions: ThemeOptions = {
  ...themeOptions,
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#ec407a',
    },
    info: {
      main: '#90caf9',
    },
    error: {
      main: '#d32f2f',
    },
    divider: '#e5eff7',
  },
}