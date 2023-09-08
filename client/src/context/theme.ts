import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Epidemic, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
      dark: "#fff",
      light: "#fff",
    },
    secondary: {
      main: "#ffffff80",
      dark: "#ffffff80",
      light: "#ffffff80",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "&.Mui-selected": {
              color: "#fff",
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#ffffff80",
          borderRadius: "10000px",
          "&:hover": {
            backgroundColor: "#ffffff21",
            color: "#fff",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          color: "#ffffff80",
        },
        subtitle2: {
          color: "#ffffff80",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: "16px",
          marginBottom: "3px",
        },
        subheader: {
          fontSize: "14px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Epidemic';
        font-weight: 500;
        font-display: swap;
        src: url('https://cdn.epidemicsound.com/legacy/16/fonts/epidemic/Epidemic-Medium.woff')
          format('woff');
      }
      
      @font-face {
        font-family: 'Epidemic';
        font-weight: 600;
        font-display: swap;
        src: url('https://cdn.epidemicsound.com/legacy/16/fonts/epidemic/Epidemic-SemiBold.woff')
          format('woff');
      }
      
      @font-face {
        font-family: 'Epidemic';
        font-weight: 700;
        font-display: swap;
        src: url('https://cdn.epidemicsound.com/legacy/16/fonts/epidemic/Epidemic-Bold.woff')
          format('woff');
      }

      @font-face {
        font-family: 'Epidemic';
        font-weight: 500;
        font-display: swap;
        src: url('https://cdn.epidemicsound.com/legacy/16/fonts/epidemic/Epidemic-Medium.woff2')
          format('woff2');
      }
      
      @font-face {
        font-family: 'Epidemic';
        font-weight: 600;
        font-display: swap;
        src: url('https://cdn.epidemicsound.com/legacy/16/fonts/epidemic/Epidemic-SemiBold.woff2')
          format('woff2');
      }
      
      @font-face {
        font-family: 'Epidemic';
        font-weight: 700;
        font-display: swap;
        src: url('https://cdn.epidemicsound.com/legacy/16/fonts/epidemic/Epidemic-Bold.woff2')
          format('woff2');
      }
        `,
    },
  },
});
