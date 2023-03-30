import { Html, Head, Main, NextScript } from 'next/document'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: "#008080"
    }
  },
  shadows: ["none"]
});

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ flexGrow: '0' }}>
              <AppBar position='relative' sx={{ flexGrow: '0' }}>
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit">
                    Production data manager
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
            <Box sx={{ flexGrow: '1' , display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
              <Main />
              <NextScript />
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </Html>
  )
}
