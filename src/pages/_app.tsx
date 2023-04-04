import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider } from '@mui/material';
import { userAgent } from 'next/server';
const theme = createTheme({
  palette: {
    primary: {
      main: "#008080"
    },
    secondary: {
      main: "#C9C9C9"
    },
    mode: "light",
    background: {
      default: "#ccc",
      paper: "#ccc"
    }
  },
  shadows: ["none"]
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {

    let next = document!.getElementById("__next");
    next!.style.flexGrow = "1";
    next!.style.display = "flex";
    next!.style.flexDirection = "column";
    next!.style.overflow = "auto";
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ flexGrow: '0' }}>
              <AppBar position='relative' sx={{ flexGrow: '1' }} style={{ flexDirection: 'row'}}>
                <Toolbar variant="regular" style={{flexGrow: '1'}}>
                  <Typography variant="h6" color="inherit" style={{flexGrow: '1'}}>
                    Production data manager
                  </Typography>
                </Toolbar>
                <Toolbar sx={{backgroundColor: 'white'}}>
                  <Image src={"/ieetec.png"} alt="ieetec_logo" width={120} height={30}></Image>
                </Toolbar>
              </AppBar>
            </Box>
            <Box sx={{ flexGrow: '1' , display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
              <Component {...pageProps} />
            </Box>
          </Box>
        </ThemeProvider>
    </>
  )
}
